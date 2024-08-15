import logging
from typing import List

import sentry_sdk
import stripe
from asgiref.sync import sync_to_async
from django.db.models import Prefetch
from django.http import HttpResponse
from ninja import Router
from ninja.errors import HttpError

from payments.models import Plan, Price, Subscription
from payments.schemas import PaymentIntentOutput, PlanModelSchema
from payments.utils import (
    create_subscription,
    modify_subscription,
    upsert_price,
    upsert_product,
)
from thedevstarter_backend import settings

logger = logging.getLogger(__name__)
router = Router()


relevant_events = {
    "product.created",
    "product.updated",
    "price.created",
    "price.updated",
    "price.deleted",
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
}


stripe.api_key = settings.STRIPE_SECRET_KEY


@router.post("/webhook", auth=None)
async def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get("Stripe-Signature")

    event = stripe.Webhook.construct_event(
        payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
    )

    if event["type"] in relevant_events:
        try:
            if event["type"] in ("product.created", "product.updated"):
                # Handle product events
                product = event["data"]["object"]
                await upsert_product(product)

            elif event["type"] in ("price.created", "price.updated", "price.deleted"):
                # Handle price events
                # Your logic to handle price events
                await upsert_price(event)

            elif event["type"] in (
                "customer.subscription.created",
                "customer.subscription.updated",
                "customer.subscription.deleted",
            ):
                await modify_subscription(event)

            elif event["type"] == "checkout.session.completed":
                await create_subscription(event)

        except Exception as e:
            logger.error(f"Error in webhook {e}")
            sentry_sdk.capture_exception(e)
            return HttpResponse(status=500, content=f"Error in webhook --<> {e}")

    return HttpResponse(status=200, content={"received": True})


@router.get("/plans", response=List[PlanModelSchema], auth=None)
async def get_active_plans(request):

    products_with_price = await sync_to_async(list)(
        Plan.objects.filter(is_active=True).prefetch_related(
            Prefetch(
                "price_set",
                queryset=Price.objects.filter(is_active=True),
                to_attr="prices",
            )
        )
    )
    return products_with_price


@router.post("checkout-session")
async def create_checkout_session(request, price_id: str):
    price = await Price.objects.select_related("plan").aget(id=price_id)
    stripe_price = await sync_to_async(stripe.Price.retrieve)(price.stripe_price_id)
    mode = "payment"
    if price.is_recurring:
        mode = "subscription"

    user = request.user

    current_sub = None
    current_sub = await sync_to_async(
        Subscription.objects.select_related("price", "price__plan")
        .filter(user=user)
        .first
    )()
    if current_sub is None:
        current_sub = await Subscription.objects.select_related(
            "price", "price__plan"
        ).acreate(
            price=price,
            user=user,
            status="incomplete",
        )
    elif (
        current_sub.price.stripe_price_id == price.stripe_price_id
        or current_sub.price.plan.stripe_plan_id == price.plan.stripe_plan_id
    ) and current_sub.status == "active":
        # User has already subscribed
        raise HttpError(400, "User already has an active subscription on same plan")

    elif current_sub.status == "active":
        # Handle Upgrades/ Downgrades

        stripe_subscription = None
        if current_sub.stripe_subscription_id:
            stripe_subscription = stripe.Subscription.retrieve(
                id=current_sub.stripe_subscription_id
            )
        old_price = current_sub.price
        if old_price.amount < price.amount:
            # Upgrade

            if stripe_subscription:
                response = stripe.Subscription.modify(
                    current_sub.stripe_subscription_id,
                    items=[
                        {
                            "id": stripe_subscription["items"]["data"][0]["id"],
                            "price": stripe_price.id,
                        }
                    ],
                    proration_behavior="always_invoice",
                )
                latest_invoice = response["latest_invoice"]
                invoice = stripe.Invoice.retrieve(id=latest_invoice)
                return PaymentIntentOutput(invoice_url=invoice["hosted_invoice_url"])

            else:
                payment_response = await sync_to_async(stripe.checkout.Session.create)(
                    success_url=settings.PAYMENT_SUCCESS_URL,
                    cancel_url=settings.PAYMENT_FAILURE_URL,
                    payment_method_types=["card"],
                    customer_email=user.email,
                    mode=mode,
                    allow_promotion_codes=settings.ALLOW_PROMOTION_CODES,
                    client_reference_id=current_sub.id,
                    phone_number_collection={
                        "enabled": settings.COLLECT_PHONE_NUMBERS,
                    },
                    line_items=[
                        {
                            "quantity": 1,
                            "price": stripe_price.id,
                        },
                    ],
                )

                return PaymentIntentOutput(
                    invoice_url=payment_response["url"],
                )
            # Send pending invoice for immediate payment

        elif old_price.amount > price.amount:
            # Downgrade

            if stripe_subscription:
                response = stripe.Subscription.modify(
                    current_sub.stripe_subscription_id,
                    items=[
                        {
                            "id": stripe_subscription["items"]["data"][0]["id"],
                            "price": stripe_price.id,
                        }
                    ],
                    proration_behavior=None,
                )
                return PaymentIntentOutput(
                    message="Your Plan would be downgraded on end of current Billing Cycle"
                )
            else:
                payment_response = await sync_to_async(stripe.checkout.Session.create)(
                    success_url=settings.PAYMENT_SUCCESS_URL,
                    cancel_url=settings.PAYMENT_FAILURE_URL,
                    payment_method_types=["card"],
                    customer_email=user.email,
                    mode=mode,
                    allow_promotion_codes=settings.ALLOW_PROMOTION_CODES,
                    client_reference_id=current_sub.id,
                    phone_number_collection={
                        "enabled": settings.COLLECT_PHONE_NUMBERS,
                    },
                    line_items=[
                        {
                            "quantity": 1,
                            "price": stripe_price.id,
                        },
                    ],
                )
                return PaymentIntentOutput(
                    invoice_url=payment_response["url"],
                )

    elif current_sub.status == "incomplete" and current_sub.price != price:
        current_sub.price = price
        await sync_to_async(current_sub.save)()

    # Create a new checkout session
    payment_response = await sync_to_async(stripe.checkout.Session.create)(
        success_url=settings.PAYMENT_SUCCESS_URL,
        cancel_url=settings.PAYMENT_FAILURE_URL,
        payment_method_types=["card"],
        customer_email=user.email,
        mode=mode,
        allow_promotion_codes=settings.ALLOW_PROMOTION_CODES,
        client_reference_id=current_sub.id,
        phone_number_collection={
            "enabled": settings.COLLECT_PHONE_NUMBERS,
        },
        line_items=[
            {
                "quantity": 1,
                "price": stripe_price.id,
            },
        ],
    )

    return PaymentIntentOutput(invoice_url=payment_response["url"])


@router.post("/subscription/cancel")
async def cancel_subscription(request):
    user = request.user
    subscription = await sync_to_async(Subscription.objects.filter(user=user).first)()
    if not subscription:
        raise HttpError(404, "Subscription not found")

    await sync_to_async(stripe.Subscription.modify)(
        subscription.stripe_subscription_id,
        cancel_at_period_end=True,
    )

    return {"status": "success"}
