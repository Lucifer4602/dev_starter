import datetime
import logging
from logging import getLogger

import stripe
from asgiref.sync import sync_to_async
from requests import HTTPError

from affiliate.models import Affiliate
from authentication.models import User
from payments.schemas import PaymentIntentOutput
from thedevstarter_backend import settings
from utils.common import update_user_of_brevo

from .models import Plan, Price, Subscription

stripe.api_key = settings.STRIPE_SECRET_KEY
logger = getLogger(__name__)
logger.setLevel(logging.DEBUG)


async def upsert_product(product):

    features = []
    if product.get("features"):
        features = [x.get("name") for x in product.get("features")]
    await sync_to_async(Plan.objects.update_or_create)(
        title=product.get("name"),
        description=product.get("description"),
        features=features,
        stripe_plan_id=product.get("id"),
        metadata=product.get("metadata"),
        is_active=product.get("active"),
    )


def upsert_products(products):
    plans = []
    for product in products:
        plan = Plan(
            title=product.get("name"),
            description=product.get("description", "Description not available"),
            features=product.get("features"),
            stripe_plan_id=product.get("id"),
            metadata=product.get("metadata"),
            is_active=product.get("active"),
        )
        plans.append(plan)

    Plan.objects.bulk_create(
        plans,
        update_conflicts=True,
        unique_fields=["id", "stripe_plan_id"],
        update_fields=["title", "description", "features", "metadata", "is_active"],
    )


async def upsert_price(event):
    price = event["data"]["object"]
    if event["type"] == "price.deleted":
        await sync_to_async(
            Price.objects.filter(stripe_price_id=price.get("id")).delete
        )()
        return
    plan_id = price.get("product")
    plan: Plan = await sync_to_async(
        Plan.objects.filter(
            stripe_plan_id=plan_id,
        ).first
    )()
    product = await sync_to_async(stripe.Product.retrieve)(plan_id)
    features = []
    if product.features:
        features = [x.get("name") for x in product.features]

    if not plan:
        if product.active:
            plan = await sync_to_async(Plan.objects.create)(
                title=product.name,
                description=product.description,
                features=features,
                stripe_plan_id=product.id,
                metadata=product.metadata,
                is_active=product.active,
            )
    else:
        plan.title = product.name
        plan.description = product.description
        plan.features = features
        plan.stripe_plan_id = product.id
        plan.metadata = product.metadata
        plan.is_active = product.active
        await sync_to_async(plan.save)()
    recurring_data = price.get("recurring", {})
    frequency = recurring_data.get("interval") if recurring_data else None
    trial_days = recurring_data.get("trial_period_days") if recurring_data else None
    exisiting_price = await sync_to_async(
        Price.objects.filter(stripe_price_id=price.get("id")).first
    )()
    if exisiting_price:
        exisiting_price.is_active = price.get("active")
        exisiting_price.amount = price.get("unit_amount")
        exisiting_price.currency = price.get("currency")
        exisiting_price.plan = plan
        exisiting_price.benefits = price.get("metadata")
        exisiting_price.frequency = frequency
        exisiting_price.trial_days = trial_days
        exisiting_price.is_recurring = price.get("type") == "recurring"
        await sync_to_async(exisiting_price.save)()
        return
    await sync_to_async(Price.objects.update_or_create)(
        is_active=price.get("active"),
        currency=price.get("currency"),
        stripe_price_id=price.get("id"),
        plan=plan,
        benefits=price.get("metadata"),
        frequency=frequency,
        trial_days=trial_days,
        is_recurring=price.get("type") == "recurring",
        amount=price.get("unit_amount"),
    )


def upsert_prices(prices: list):
    all_prices = []
    for price in prices:
        plan_id = price.get("product")
        plan = Plan.objects.filter(
            stripe_plan_id=plan_id,
        ).first()
        product = stripe.Product.retrieve(plan_id)
        features = [x.get("name") for x in product.features]
        if not plan:
            plan = Plan.objects.create(
                title=product.name,
                description=product.description
                if product.description
                else "Description not available",
                features=features,
                stripe_plan_id=product.id,
                metadata=product.metadata,
                is_active=product.active,
            )
        else:
            plan.title = product.name
            plan.description = (
                product.description
                if product.description
                else "Description not available"
            )
            plan.features = features
            plan.stripe_plan_id = product.id
            plan.metadata = product.metadata
            plan.is_active = product.active
            plan.save()

        new_price = Price(
            is_active=price.get("active"),
            currency=price.get("currency"),
            stripe_price_id=price.get("id"),
            plan=plan,
            benefits=price.get("metada"),
            frequency=price.get("recurring", {}).get("interval", None)
            if price.get("recurring", {})
            else None,
            trial_days=price.get("recurring", {}).get("trial_period_days")
            if price.get("recurring", {})
            else None,
            is_recurring=price.get("type") == "recurring",
            amount=price.get("unit_amount"),
        )

        all_prices.append(new_price)

    Price.objects.bulk_create(
        all_prices,
        update_conflicts=True,
        unique_fields=["stripe_price_id"],
        update_fields=[
            "currency",
            "benefits",
            "frequency",
            "trial_days",
            "is_recurring",
            "amount",
            "is_active",
        ],
    )


async def modify_subscription(event):
    stripe_subscription_id = event["data"]["object"]["id"]
    status = event["data"]["object"]["status"]

    if event["type"] == "customer.subscription.updated":
        new_subs_price_id = event["data"]["object"]["plan"]["id"]
        new_price = await sync_to_async(
            Price.objects.filter(stripe_price_id=new_subs_price_id).first
        )()
        print("new price0-----<>", new_price)
        subscription = await sync_to_async(
            Subscription.objects.filter(
                stripe_subscription_id=stripe_subscription_id
            ).first
        )()
        print("subscription-----<>", subscription)
        if subscription:
            subscription.price = new_price
            subscription.status = status
            await sync_to_async(subscription.save)()

    elif event["type"] == "customer.subscription.deleted":
        await sync_to_async(
            Subscription.objects.filter(
                stripe_subscription_id=stripe_subscription_id
            ).update
        )(status="expired")


async def create_subscription(event):
    subscription_id = event["data"]["object"]["client_reference_id"]
    stripe_customer_id = event["data"]["object"]["customer"]
    stripe_subscription_id = event["data"]["object"]["subscription"]
    subscription = await sync_to_async(
        Subscription.objects.select_related("user")
        .prefetch_related("user__reffered_by")
        .filter(id=subscription_id)
        .first
    )()

    if not subscription:
        raise HTTPError(400, "Corresponding subscription not found")

    user = subscription.user
    await sync_to_async(User.objects.filter(id=user.id).update)(
        stripe_customer_id=stripe_customer_id
    )
    await sync_to_async(Subscription.objects.filter(id=subscription_id).update)(
        status="active",
        updated_at=datetime.datetime.utcnow(),
        stripe_subscription_id=stripe_subscription_id,
    )

    reffered_by = user.reffered_by
    try:
        # You can customize the REFERRAL_BONUS to act as a multiplier as well
        if reffered_by is not None:
            await sync_to_async(Affiliate.objects.filter(id=reffered_by.id).update)(
                earnings=settings.REFERRAL_BONUS,
                total_revenue_share=settings.REFERRAL_BONUS,
            )
    except Exception as e:
        logger.exception(e)

    await update_user_of_brevo(user, "Paid")

    # TODO: update user limits
    return True


async def handle_checkout_session(user, stripe_price, mode, current_sub):
    payment_response = await sync_to_async(stripe.checkout.Session.create)(
        success_url=settings.PAYMENT_SUCCESS_URL,
        cancel_url=settings.PAYMENT_FAILURE_URL,
        payment_method_types=["card"],
        customer_email=user.email,
        mode=mode,
        allow_promotion_codes=settings.ALLOW_PROMOTION_CODES,
        client_reference_id=current_sub.id,
        phone_number_collection={"enabled": settings.COLLECT_PHONE_NUMBERS},
        line_items=[{"quantity": 1, "price": stripe_price.id}],
    )

    return PaymentIntentOutput(invoice_url=payment_response["url"])
