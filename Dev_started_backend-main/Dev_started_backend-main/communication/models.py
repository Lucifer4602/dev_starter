import uuid

from django.db import models

from authentication.models import User
from thedevstarter_backend.models import BaseModel


class Banner(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    description = models.TextField(max_length=150, null=True)
    button_link = models.CharField(null=True, blank=True, max_length=50)
    button_name = models.CharField(max_length=50)
    expired_on = models.DateTimeField(null=True, blank=True)
    is_expired = models.BooleanField(default=False)

    def __str__(self):
        return f"User: {self.button_name}"


class NewletterSubscribers(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    email = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"User: {self.email}"


class GitHubProfile(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    github_username = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"User: {self.github_username}"


class Contact(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return f"User: {self.email}"


class Feedback(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    feedback_score = models.IntegerField()
    feedback_suggestion = models.CharField(max_length=100, null=True)
    feedback_other_suggestions = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"User: {self.user.username}  | Score: {self.feedback_score}"
