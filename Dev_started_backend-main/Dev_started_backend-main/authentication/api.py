from typing import List, Optional

import sentry_sdk
from asgiref.sync import sync_to_async
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.password_validation import validate_password
from django.core.files.storage import default_storage
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.views.decorators.csrf import csrf_exempt
from ninja import File, Router, UploadedFile
from ninja.errors import HttpError

from affiliate.models import Affiliate
from communication.models import GitHubProfile
from payments.models import Subscription
from thedevstarter_backend import settings
from thedevstarter_backend.schemas import GenericResponse
from utils.common import add_user_to_brevo
from utils.ds_logger import DSLogger

from .models import ApiKey, AuthProviderChoices, User
from .schemas import (
    ApiKeyBase,
    ApiKeyInput,
    ChangePasswordInput,
    ResetPasswordInput,
    TokenResponse,
    UpdateUser,
    UserInfo,
    UserLogIn,
    UserSignIn,
    UserType,
)
from .social_auth.google import GoogleOAuth2
from .utils import (
    Token,
    generate_api_key,
    mask_api_key,
    send_verification_email,
    split_name,
)

logger = DSLogger(__name__)

router = Router()


@router.get("/api-key", response=List[ApiKeyBase])
async def list_api_keys(request):
    user: User = request.user
    api_keys = await sync_to_async(list)(ApiKey.objects.filter(user=user).all())

    api_keys_data = [
        ApiKeyBase(
            id=key.pk,
            key=mask_api_key(key.key, 10),
            created_on=key.created_on,
            title=key.title,
        )
        for key in api_keys
    ]
    return api_keys_data


@router.delete("/api-key/{id}", response=GenericResponse)
async def delete_api_keys(request, id: int):
    user: User = request.user

    try:

        api_key = await ApiKey.objects.aget(user=user, id=id)

        await api_key.adelete()
        return GenericResponse(message="Api Key Deleted")
    except ApiKey.DoesNotExist:
        raise HttpError(404, "Api Key not found")
    except Exception as e:
        logger.exception(e)
        raise HttpError(
            500, f"Something went wrong please contact {settings.ADMIN_EMAIL}"
        )


@router.post("/api-key", response=ApiKeyBase)
async def create_api_key(request, input_data: ApiKeyInput):
    user: User = request.user
    try:
        api_key = await ApiKey.objects.acreate(
            user=user, key=generate_api_key(), title=input_data.title
        )
        return ApiKeyBase(
            id=api_key.pk,
            key=api_key.key,
            created_on=api_key.created_on,
            title=api_key.title,
        )
    except Exception as e:
        logger.exception(e)
        raise HttpError(
            500, f"Something went wrong please contact {settings.ADMIN_EMAIL}"
        )


google_auth = GoogleOAuth2(
    GOOGLE_CLIENT_ID=settings.GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_CLIENT_SECRET=settings.GOOGLE_OAUTH2_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI=settings.GOOGLE_REDIRECT_URI,
)


@router.post("/sign-up", auth=None)
async def sign_in(
    request, input_data: UserSignIn, affiliate_code: Optional[str] = None
) -> TokenResponse:
    try:
        affiliate = await sync_to_async(Affiliate.objects.get)(
            affiliate_code=affiliate_code
        )
    except Affiliate.DoesNotExist as e:
        sentry_sdk.capture_exception(e)
        affiliate = None
    try:
        validate_password(input_data.password)
    except Exception as e:
        raise HttpError(400, f"{e}")

    try:
        validate_email(input_data.email)
    except Exception as e:
        raise HttpError(400, f"{e}")

    token_handler = Token()

    user = await sync_to_async(User.objects.filter(email=input_data.email).first)()

    if user and user.is_active:
        raise HttpError(400, "User Already Exists")

    if not user:
        hashed_password = make_password(input_data.password)
        user = await User.objects.acreate(
            first_name=input_data.first_name,
            last_name=input_data.last_name,
            username=input_data.email,
            password=hashed_password,
            email=input_data.email,
            is_active=not settings.VERIFY_EMAIL_ON_SIGNUP,
        )
        if affiliate is not None:
            affiliate.successful_signups += 1
            await sync_to_async(affiliate.save)()
            user.reffered_by = affiliate
            await sync_to_async(user.save)()
        user_type = UserType.free.value
        await add_user_to_brevo(input_data, user_type)

    token_payload = token_handler.get_token_payload(user)
    token_payload["verify_email"] = True
    token = token_handler.encode_jwt(token_payload)

    if settings.VERIFY_EMAIL_ON_SIGNUP:
        await send_verification_email(user.email, token)

    return TokenResponse(
        token=token, verification_required=settings.VERIFY_EMAIL_ON_SIGNUP
    )


@router.post("/log-in", auth=None)
async def log_in(request, input_data: UserLogIn):
    user = await sync_to_async(User.objects.filter(email=input_data.email).first)()
    if not user:
        raise HttpError(400, "User not found")

    token_handler = Token()
    if not user.is_active:
        token_payload = token_handler.get_token_payload(user)
        token_payload["verify_email"] = True
        token = token_handler.encode_jwt(token_payload)
        await send_verification_email(user.email, token)
        raise TokenResponse(token=token, verification_required=True)

    valid = check_password(input_data.password, encoded=user.password)

    if not valid:
        raise HttpError(400, "Wrong Password")

    token_payload = token_handler.get_token_payload(user)
    token = token_handler.encode_jwt(token_payload)

    return TokenResponse(token=token)


@router.get("/social-auth-init-url", auth=None)
async def get_social_auth_url(request, next_route: Optional[str] = None):
    redirect_url = google_auth.get_auth_url(state={"next": next_route})
    return redirect_url


@csrf_exempt
@router.post("/check-social-auth-code", auth=None)
async def check_social_auth_code(
    request, code: str, affiliate_code: Optional[str] = None
):
    try:
        social_user = await google_auth.validate_code(code)
        email = social_user.get("email")
        user = await sync_to_async(User.objects.filter(email=email).first)()
        if not user:
            first_name, last_name = split_name(social_user.get("name"))
            user = await User.objects.acreate(
                first_name=first_name,
                last_name=last_name,
                username=email,
                email=email,
                is_active=True,
                providers=[AuthProviderChoices.GOOGLE],
                avatar_url=social_user.get("picture"),
            )
            try:
                affiliate = await sync_to_async(Affiliate.objects.get)(
                    affiliate_code=affiliate_code
                )
            except Affiliate.DoesNotExist as e:
                sentry_sdk.capture_exception(e)
                affiliate = None
            if affiliate is not None:
                affiliate.successful_signups += 1
                await sync_to_async(affiliate.save)()
                user.reffered_by = affiliate
                await sync_to_async(user.save)()
            try:
                user_type = UserType.free.value
                await add_user_to_brevo(user, user_type)
            except Exception as e:
                print(e)

        else:
            if user.providers and AuthProviderChoices.GOOGLE not in user.providers:
                if user.providers is None:
                    providers = [AuthProviderChoices.GOOGLE]
                else:
                    providers = user.providers.extend([AuthProviderChoices.GOOGLE])

                await sync_to_async(User.objects.filter(username=user.username).update)(
                    providers=providers
                )

        token_handler = Token()
        token_payload = token_handler.get_token_payload(user)
        token = token_handler.encode_jwt(token_payload)

        return TokenResponse(token=token)

    except Exception as e:
        sentry_sdk.capture_exception(e)
        raise HttpError(401, "Expired, try again")


@router.get("/user-info", response=UserInfo)
async def get_user_info(request):
    user: User = request.user
    subscription = await sync_to_async(
        Subscription.objects.select_related("price", "price__plan")
        .filter(user=user)
        .filter(status="active")
        .first
    )()
    github_profile = await sync_to_async(
        GitHubProfile.objects.select_related("user").filter(user=user).first
    )()

    if github_profile:
        github_username = github_profile.github_username
    else:
        github_username = None
    return UserInfo(
        subscription=subscription,
        first_name=user.first_name,
        email=user.email,
        last_name=user.last_name,
        username=user.username,
        is_active=user.is_active,
        avatar_url=user.avatar_url,
        stripe_customer_id=user.stripe_customer_id,
        providers=user.providers,
        github_username=github_username,
        is_impersonated=request.is_impersonated,
    )


@router.patch("/user-profile")
async def update_user_profile(
    request, input_data: UpdateUser, user_avatar: Optional[UploadedFile] = File(None)
):

    user: User = request.user
    user_avatar_path = None
    old_url = None
    # try:
    if user_avatar is not None and user_avatar != "":
        old_url = user.avatar_url
        file_key = f"{user.username}/avatar/{user_avatar.name}"
        file_name = await sync_to_async(default_storage.save)(file_key, user_avatar)
        user_avatar_path = f"{settings.MEDIA_ROOT}/{file_name}"

    await User.objects.filter(username=user.username).aupdate(
        first_name=input_data.first_name if input_data.first_name else user.first_name,
        last_name=input_data.last_name if input_data.last_name else user.last_name,
        email=input_data.email if input_data.email else user.email,
        avatar_url=user_avatar_path if user_avatar_path else user.avatar_url,
    )

    # cleanup old file
    if old_url and old_url.startswith(settings.MEDIA_ROOT):
        await sync_to_async(default_storage.delete)(
            old_url.replace(settings.MEDIA_ROOT, "")
        )

    # except Exception as e:
    #     sentry_sdk.capture_exception(e)
    #     return 500, {"message": "Something went wrong"}

    return 200, {"success": True}


@router.post("/send-magic-link", auth=None)
async def send_magic_link(request, email: str):
    try:
        validate_email(email)
    except Exception as e:
        raise HttpError(400, f"{e}")

    user = await sync_to_async(User.objects.filter(email=email).first)()
    if not user:
        user = await User.objects.acreate(
            first_name=email,
            last_name="",
            username=email,
            email=email,
            is_active=False,
            providers=[AuthProviderChoices.MAGIC_LINK],
        )

    token_handler = Token()
    token_payload = token_handler.get_token_payload(user)
    token_payload["verify_email"] = True
    token = token_handler.encode_jwt(token_payload)
    await send_verification_email(user.email, token)

    return TokenResponse(token=token, verification_required=True)


@router.post("/verify-magic-link", auth=None)
async def verify_magic_link(request, code: str):
    token_handler = Token()
    decoded_data = token_handler.decode_jwt(code)
    if decoded_data.get("verify_email") is True:
        user = await User.objects.aget(username=decoded_data["username"])
        user.is_active = True
        await user.asave()

        token_payload = token_handler.get_token_payload(user)
        token = token_handler.encode_jwt(token_payload)
        return TokenResponse(token=token)
    else:
        raise HttpError(400, "Invalid Code")


@router.post("/request-reset-password", auth=None)
async def request_reset_password(request, email: str):
    user = await sync_to_async(User.objects.filter(email=email).first)()
    if not user:
        raise HttpError(404, "User does not exist please Sign up instead")

    token_handler = Token()
    payload = {
        "username": user.username,
        "request_type": "reset_password",
    }

    encoded = token_handler.encode_jwt(payload, expiry_hours=1)
    await sync_to_async(send_mail)(
        "Knock Knock, seems you forgot your password",
        f"""
        Thanks for raising a request to reset your password, here is the link to reset your password {settings.PASSWORD_REDIRECT_URI}?code={encoded}
        """,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

    return "Password reset email sent"


@router.post("/reset-password", auth=None)
async def reset_password(request, input_data: ResetPasswordInput):
    token_handler = Token()

    data = token_handler.decode_jwt(input_data.code)
    username = data["username"]
    request_type = data["request_type"]

    if request_type != "reset_password":
        raise HttpError(401, "invalid reset code")

    user = await sync_to_async(User.objects.filter(username=username).first)()
    if not user:
        raise HttpError(404, "User does not exist please Sign up instead")

    hashed_password = make_password(input_data.password)
    await sync_to_async(User.objects.filter(username=username).update)(
        password=hashed_password
    )

    token_handler = Token()
    token_payload = token_handler.get_token_payload(user)
    auth_token = token_handler.encode_jwt(token_payload)

    return TokenResponse(token=auth_token)


@router.post("/change-password")
async def change_password(request, input_data: ChangePasswordInput):
    user: User = request.user

    # allow user to set password if they're not already using password auth
    if user.providers and AuthProviderChoices.PASSWORD in user.providers:
        valid = check_password(input_data.old_password, encoded=user.password)

        if not valid:
            raise HttpError(400, "Wrong Password")

    hashed_password = make_password(input_data.new_password)

    if isinstance(user.providers, list):
        user.providers.append(AuthProviderChoices.PASSWORD)
        providers = list(set(user.providers))
    else:
        providers = [AuthProviderChoices.PASSWORD]
    try:
        await User.objects.filter(username=user.username).aupdate(
            password=hashed_password, providers=providers
        )
    except Exception as e:
        print("EROR- ---<><>", e)
        sentry_sdk.capture_exception(e)
        return 500, {"message": "Something went wrong"}

    return 200, {"success": True}
