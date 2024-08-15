import random
import string
from datetime import datetime, timedelta
from typing import Dict

import jwt
from asgiref.sync import sync_to_async
from django.core.mail import send_mail
from ninja.errors import HttpError

from authentication.models import User
from thedevstarter_backend import settings


class Token:

    SECRET = settings.JWT_AUTH_SECRET
    algorithm = settings.JWT_AUTH_ALGORITHM

    def __init__(
        self, *, secret=settings.JWT_AUTH_SECRET, algorithm=settings.JWT_AUTH_ALGORITHM
    ):
        self.SECRET = secret
        self.algorithm = algorithm

    def encode_jwt(
        self, data: Dict, expiry_hours: int = settings.AUTH_TOKEN_EXPIRY_DAYS * 24
    ):

        expiration_time = datetime.utcnow() + timedelta(hours=expiry_hours)
        data["exp"] = expiration_time
        encoded = jwt.encode(data, self.SECRET, algorithm=self.algorithm)
        return encoded

    def decode_jwt(self, token):
        try:
            decoded = jwt.decode(token, self.SECRET, algorithms=[self.algorithm])
            return decoded
        except jwt.ExpiredSignatureError:
            raise HttpError(401, "Token has expired")

    def get_token_payload(self, user: User) -> Dict:

        return {
            "email": user.email,
            "username": user.username,
            "is_active": user.is_active,
        }


def split_name(full_name):
    parts = full_name.split()
    if len(parts) == 1:
        first_name = parts[0]
        last_name = ""
    else:
        first_name = " ".join(parts[:-1])
        last_name = parts[-1]
    return first_name, last_name


@sync_to_async
def send_verification_email(email: str, token: str):
    send_mail(
        f"Please Verify your email to continue at {settings.COMPANY_NAME}",
        f"""
        Thanks for raising a request to reset your password, here is the link to reset your password

        {settings.EMAIL_VERIFICATION_REDIRECT_URI}?emailVerifyCode={token}
        """,
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False,
    )


def mask_api_key(key: str, size: int) -> str:
    """
    Mask the API key by showing only the first 4 characters followed by asterisks.

    :param key: The original API key
    :return: The masked API key
    """
    if len(key) <= size:
        return key
    return key[:size] + "*" * (len(key) - size)


def generate_api_key():
    prefix = "tds_rw_"
    alphanumeric = string.ascii_letters + string.digits
    random_string = "".join(random.choice(alphanumeric) for _ in range(20))
    return prefix + random_string
