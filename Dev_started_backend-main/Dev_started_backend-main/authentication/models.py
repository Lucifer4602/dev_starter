from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import CharField

from thedevstarter_backend import settings
from thedevstarter_backend.models import BaseModel
from utils.fields.ChoicedArray import ChoiceArrayField

# Create your models here.


class AuthProviderChoices(models.TextChoices):
    GOOGLE = "Google", "Google"
    PASSWORD = "Password", "Password"
    MAGIC_LINK = "Magic Link", "Magic Link"


class User(AbstractUser):

    providers = ChoiceArrayField(
        CharField(choices=AuthProviderChoices.choices, max_length=100),
        blank=True,
        null=True,
    )
    avatar_url = models.URLField(default=settings.DEFAULT_USER_AVATAR, null=True)
    stripe_customer_id = models.CharField(max_length=500, null=True, blank=True)
    reffered_by = models.ForeignKey(
        "affiliate.Affiliate",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reffered_users",
    )

    def save(self, *args, **kwargs):

        if self.password and not self.password.startswith(
            ("pbkdf2_sha256$", "bcrypt$", "argon2")
        ):

            self.password = make_password(self.password)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"User: {self.username}"


class ApiKey(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    key = models.CharField(max_length=40)
    title = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user}"
