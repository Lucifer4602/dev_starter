import sentry_sdk
from ninja.security import HttpBearer

from affiliate.models import Affiliate
from authentication.models import User
from authentication.utils import Token
from utils.common import is_async


class AuthBearer(HttpBearer):
    async def a_auth(self, request, token):
        try:
            data = Token().decode_jwt(token)
            username = data.get("username")
            is_impersonated = data.get("is_impersonated", False)
            user = await User.objects.aget(username=username)
            if user.is_active:

                request.is_impersonated = is_impersonated
                request.user = user
                return True

            return False

        except Exception as e:
            sentry_sdk.capture_exception(e)
            return False

    def auth(self, request, token):
        try:
            data = Token().decode_jwt(token)
            username = data.get("username")
            is_impersonated = data.get("is_impersonated", False)
            user = User.objects.filter(username=username).first()
            if user.is_active:
                request.is_impersonated = is_impersonated
                request.user = user
                return True

            return False

        except Exception as e:
            sentry_sdk.capture_exception(e)
            return False

    async def authenticate(self, request, token):
        if is_async():
            return await self.a_auth(request, token)
        else:
            return await self.auth(request, token)


async def increment_affiliate_signups(affiliate: Affiliate):
    """
    Function to increment affiliate clicks
    """
    affiliate.sucessful_signups += 1
    await affiliate.save()
    return affiliate
