from datetime import datetime
from enum import Enum
from typing import List, Optional

from ninja import ModelSchema, Schema
from pydantic import EmailStr

from authentication.models import User
from payments.schemas import SubscriptionModelSchema

# from datetime import datetime


class ApiKeyBase(Schema):
    id: int
    key: str
    title: str
    created_on: datetime


class ApiKeyInput(Schema):
    title: str


class UserType(str, Enum):
    free = "free"
    paid = "paid"


class UserSignIn(Schema):
    first_name: str
    last_name: str
    email: str
    password: str


class UserLogIn(Schema):
    email: str
    password: str


class ResetPasswordInput(Schema):
    code: str
    password: str


class ChangePasswordInput(Schema):
    old_password: str
    new_password: str


class TokenResponse(Schema):
    token: str
    verification_required: Optional[bool] = False


class UserModelSchema(ModelSchema):
    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "avatar_url",
            "stripe_customer_id",
        )


class UserInfo(ModelSchema):

    subscription: Optional[SubscriptionModelSchema] = None
    providers: Optional[List[str]] = []
    github_username: Optional[str] = None
    is_impersonated: Optional[bool] = False

    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "avatar_url",
            "stripe_customer_id",
        )


class UpdateUser(Schema):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
