import uuid

from asgiref.sync import sync_to_async
from ninja import Router
from ninja.errors import HttpError

from affiliate.models import Affiliate
from affiliate.schemas import AffiliateModelSchema
from utils.ds_logger import DSLogger

logger = DSLogger(__name__)
router = Router()


@router.get(
    "/", response=AffiliateModelSchema
)  # auth=None means no authentication is required
async def get_affiliate_account_details(request):
    if request.user.is_anonymous:
        raise HttpError(401, "User is not authenticated")
    else:
        user = request.user

    affiliate = None
    try:
        affiliate = await sync_to_async(Affiliate.objects.get)(user=user)
    except Affiliate.DoesNotExist as e:
        logger.exception(e)
        affiliate = None

    if affiliate is None:
        affiliate_code = str(uuid.uuid4())
        affiliate = await sync_to_async(Affiliate.objects.create)(
            user=user, affiliate_code=affiliate_code
        )

    return affiliate


@router.delete("/")
async def delete_affiliate_account(request):
    if request.user.is_anonymous:
        return {"error": "User is not authenticated"}
    else:
        user = request.user

    affiliate = None
    try:
        affiliate = await sync_to_async(Affiliate.objects.get)(user=user)
    except Affiliate.DoesNotExist as e:
        logger.exception(e)
        affiliate = None

    if affiliate is None:
        return {"error": "No affiliate account found for user"}

    await sync_to_async(affiliate.delete)()
    return {"message": "Affiliate account deleted successfully"}


@router.get("/increment-clicks", auth=None)
async def increment_clicks(request, affiliate_code: str):
    print(
        f"User with affiliate code {affiliate_code} requested for incrementing signups"
    )
    try:
        affiliate = await sync_to_async(Affiliate.objects.get)(
            affiliate_code=affiliate_code
        )
    except Affiliate.DoesNotExist as e:
        logger.exception(e)
        affiliate = None

    if affiliate is None:
        return {"error": "Invalid affiliate code"}

    affiliate.clicks += 1
    await sync_to_async(affiliate.save)()

    return {"message": "success"}
