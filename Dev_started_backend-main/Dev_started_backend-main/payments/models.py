import uuid

# Create your models here.
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_better_admin_arrayfield.models.fields import ArrayField

from authentication.models import User
from thedevstarter_backend import settings
from thedevstarter_backend.models import BaseModel

# Create your models here.


class Plan(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    features = ArrayField(models.CharField(max_length=500, blank=True), default=list)
    metadata = models.JSONField(default=dict, null=True, blank=True)
    stripe_plan_id = models.CharField(
        max_length=1000, unique=True, null=False, blank=False
    )
    is_active = models.BooleanField(default=True)
    github_repos = ArrayField(
        models.CharField(max_length=200, blank=True), default=list
    )

    def __str__(self):
        return self.title


class Price(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )

    stripe_price_id = models.CharField(max_length=1000, unique=True)
    plan = models.ForeignKey(Plan, blank=False, null=False, on_delete=models.CASCADE)
    benefits = models.JSONField(null=True, default=list)
    amount = models.FloatField()
    currency = models.CharField(max_length=10)
    frequency = models.CharField(
        max_length=10,
        choices=(
            ("day", "day"),
            ("week", "week"),
            ("month", "month"),
            ("year", "year"),
        ),
        null=True,
        blank=True,
        default="month",
    )
    is_active = models.BooleanField(default=True)
    is_default = models.BooleanField(default=False)
    trial_days = models.IntegerField(default=0, null=True)
    is_recurring = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.amount / 100}  {self.currency}"


class Subscription(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    price = models.ForeignKey(
        Price, blank=False, null=True, on_delete=models.SET_NULL
    )  # TODO:rename to price instead of price_id
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE
    )  # TODO:rename to price instead of user_id
    status = models.CharField(
        max_length=50,
        default="incomplete",
        choices=(
            ("incomplete", "incomplete"),
            ("incomplete_expired", "incomplete_expired"),
            ("trialing", "trialing"),
            ("active", "active"),
            ("past_due", "past_due"),
            ("canceled", "canceled"),
            ("unpaid", "unpaid"),
        ),
    )
    stripe_subscription_id = models.CharField(
        max_length=500, null=True, blank=True, unique=True
    )

    def __str__(self):
        return f"User: {self.user.username} | status: {self.status}"


class UserLimit(models.Model):
    credits = models.IntegerField(default=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"User: {self.user.username} | credits left: {self.credits}"


# Create UserLimit on user creation
@receiver(post_save, sender=User)
def post_save_user(sender, **kwargs):

    user = kwargs.get("instance", None)
    created = kwargs.get("created", False)

    if created:
        UserLimit.objects.create(user=user)
