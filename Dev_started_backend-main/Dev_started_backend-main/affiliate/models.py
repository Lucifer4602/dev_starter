import uuid

from django.db import models

from authentication.models import User
from communication.models import BaseModel

# Create your models here.


class Affiliate(BaseModel):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    affiliate_code = models.CharField(max_length=100, unique=True)
    clicks = models.IntegerField(default=0)
    successful_signups = models.IntegerField(default=0)
    total_revenue_share = models.FloatField(default=0)
    pending_dues = models.FloatField(default=0)
    earnings = models.FloatField(default=0)

    def __str__(self):
        return f"User: {str(self.affiliate_code)}  | total_revenue_share: {self.total_revenue_share}"


class AffiliateTransaction(BaseModel):
    id = models.BigAutoField(primary_key=True, unique=True, editable=False)

    affiliate = models.ForeignKey(
        Affiliate, on_delete=models.CASCADE, null=True, blank=True
    )

    payout_amount = models.FloatField(default=0, null=False, blank=False)

    def __str__(self):
        return f"User: {self.id}  | payout_amount: {self.payout_amount}"
