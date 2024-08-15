from typing import Optional

from ninja import ModelSchema, Schema

from .models import Banner


class NewsLetter(Schema):
    email: str


class ContactSchema(Schema):
    first_name: str
    last_name: str
    email: str
    message: str
    token: Optional[str] = None


class FeedbackSchema(Schema):
    feedback_score: int
    feedback_suggestion: Optional[str]
    feedback_other_suggestions: Optional[str]


class BannerModelSchema(ModelSchema):
    class Meta:
        model = Banner
        fields = (
            "id",
            "description",
            "button_link",
            "button_name",
            "expired_on",
            "is_expired",
        )


class GithubProfile(Schema):
    github_username: str


class DemoEmailInput(Schema):
    to: str
    subject: str
    message: str
