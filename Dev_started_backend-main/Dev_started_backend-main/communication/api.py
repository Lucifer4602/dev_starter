import json
import logging

from asgiref.sync import sync_to_async
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.db.models import F
from ninja import Router
from ninja.errors import HttpError

from authentication.models import User
from payments.models import Subscription
from thedevstarter_backend import settings
from utils.AsyncClient import AsyncClient
from utils.common import give_github_repo_access, verify_recaptcha

from .models import Banner, Contact, Feedback, GitHubProfile, NewletterSubscribers
from .schemas import (
    ContactSchema,
    DemoEmailInput,
    FeedbackSchema,
    GithubProfile,
    NewsLetter,
)
from .utils import handle_news_letter_subscribe

logger = logging.getLogger(__name__)

router = Router()


@router.post("/subscribe-to-newsletter", auth=None)
async def subscribe_to_newsletter(request, input_data: NewsLetter):
    email = input_data.email
    try:
        validate_email(input_data.email)
    except Exception as e:
        raise HttpError(400, f"{e}")

    user = await sync_to_async(
        NewletterSubscribers.objects.filter(email=input_data.email).first
    )()
    if user:
        raise HttpError(400, "You have already subscribed")
    await sync_to_async(NewletterSubscribers.objects.create)(email=email)

    async_client = AsyncClient()
    if settings.BEEHIV_API_KEY and settings.BEEHIV_PUBLICATION_ID:
        try:
            status, response = await handle_news_letter_subscribe(email, async_client)
            response = json.loads(response)

            if status == 201:
                return {
                    "status": status,
                    "message": "Subscribed to Newsletter Successfully",
                }
            logger.error(
                f"\n\n\nFailed to subscribe to beehiv newsletter. Status: {status}, Error: {response['errors'][0]['message']}\n\n\n"
            )

            raise HttpError(
                status, "Something went wrong. Please try again after some time."
            )
        finally:
            await async_client.close_session()
    return {"status": 201, "message": "Subscribed to Newsletter Successfully"}


@router.post("/contact", auth=None)
async def handle_contact(request, input_data: ContactSchema):
    token = input_data.token

    if settings.RECAPTCHA_SECRET_KEY:
        status, verificiation_response = await verify_recaptcha(token)
        verificiation_response = json.loads(verificiation_response)
        if not verificiation_response.get("success"):
            logger.error(
                f"\n\n\nRecaptcha Authentication Failed due to {verificiation_response.get('error-codes')}\n\n\n"
            )
            raise HttpError(
                400, "Captcha Verification failed please try again after some time."
            )
    else:
        logger.error(
            "\n\n\nRecaptcha Authentication Failed. To enable recaptcha verification add env variable RECAPTCHA_SECRET_KEY in the backend and NEXT_PUBLIC_RECAPTCHA_SITE_KEY in the frontend\n\n\n"
        )

    try:
        validate_email(input_data.email)
    except Exception as e:
        raise HttpError(400, f"{e}")

    try:
        await sync_to_async(Contact.objects.create)(
            first_name=input_data.first_name,
            last_name=input_data.last_name,
            email=input_data.email,
            message=input_data.message,
        )
    except Exception as e:
        raise HttpError(500, f"Failed to save contact form submission: {e}")

    first_name = input_data.first_name
    last_name = input_data.last_name
    email = input_data.email
    message = input_data.message
    subject = "Contact Form Submission"
    body = f"""
    Hello,
    You have received a new contact form submission:
    Name: {first_name} {last_name}
    Email: {email}
    Message: {message}
    Please respond to the user as soon as possible.
    Best regards,
    The Dev Starter
    """
    try:
        await sync_to_async(send_mail)(
            subject,
            body,
            settings.EMAIL_HOST_USER,
            [settings.ADMIN_EMAIL],
            fail_silently=False,
        )
    except Exception as e:
        raise HttpError(500, f"Failed to send contact form submission email: {e}")

    return {
        "status": 201,
        "message": "Thank you for contacting us. We have received your message and will get back to you as soon as possible.",
    }


@router.post("/feedback", auth=None)
async def handle_feedback(request, input_data: FeedbackSchema):
    try:
        await sync_to_async(Feedback.objects.create)(
            feedback_score=input_data.feedback_score,
            feedback_suggestion=input_data.feedback_suggestion,
            feedback_other_suggestions=input_data.feedback_other_suggestions,
        )
        return {
            "status": 201,
            "message": "Thank you for submitting your valuable feedback",
        }
    except Exception as e:
        raise HttpError(500, f"Failed to save feedback form submission: {e}")


@router.get("/fetch_banner_details", auth=None)
def fetch_banner(request):
    try:
        # Assuming you want to retrieve the latest banner based on the 'created_on' field
        banner = (
            Banner.objects.values(
                "id",
                "description",
                "button_link",
                "button_name",
                "expired_on",
                "is_expired",
            )
            .order_by(F("created_on").desc())
            .first()
        )

        banner_info = {
            "id": str(banner["id"]),
            "description": banner["description"],
            "button_link": banner["button_link"],
            "button_name": banner["button_name"],
            "expired_on": banner["expired_on"].isoformat()
            if banner["expired_on"]
            else None,
            "is_expired": banner["is_expired"],
        }

        return banner_info
    except Exception as e:
        return {
            "status": 500,
            "message": f"Failed to fetch banner details: {str(e)}",
        }


@router.post("/submit-github-username")
async def submit_github_username(request, input_data: GithubProfile):
    user: User = request.user

    subscription = await sync_to_async(
        Subscription.objects.select_related("price", "price__plan")
        .filter(user=user)
        .filter(status="active")
        .first
    )()

    if not subscription:
        raise HttpError(500, "You do not have any active subscription.")

    github_profile = await sync_to_async(
        GitHubProfile.objects.select_related("user").filter(user=user).first
    )()

    if github_profile:
        raise HttpError(
            500,
            f"Access already granted to github user {github_profile.github_username}",
        )

    try:
        await give_github_repo_access(
            input_data.github_username, subscription.price.plan
        )

        access = await sync_to_async(GitHubProfile.objects.create)(
            user=user, github_username=input_data.github_username
        )

        if access:
            return (
                "Repository access granted, please check invitation mail in your inbox."
            )
        raise HttpError(
            500, "Failed to grant GitHub repo access, please try again later."
        )

    except Exception as e:
        logger.error("Error in giving GitHub repo access", e)
        raise HttpError(500, f"Failed to give GitHub repo access {e}")


@router.post("/send-demo-email")
async def send_demo_email(request, input_data: DemoEmailInput):

    try:
        await sync_to_async(send_mail)(
            input_data.subject,
            input_data.message,
            settings.EMAIL_HOST_USER,
            [input_data.to],
            fail_silently=False,
        )
    except Exception as e:
        logger.error(f"Error sending demo email {e}")
        raise HttpError(
            500, f"Failed to send email please contact {settings.ADMIN_EMAIL}"
        )
