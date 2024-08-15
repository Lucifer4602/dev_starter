from typing import List, Optional

from ninja import ModelSchema, Schema

from payments.models import Plan, Price, Subscription


class PlanModelDefaultSchema(ModelSchema):
    class Meta:
        model = Plan
        fields = "__all__"


class PriceModelSchema(ModelSchema):

    trial_days: Optional[int] = 0
    plan: PlanModelDefaultSchema
    frequency: Optional[str] = None

    class Meta:
        model = Price
        exclude = ("plan",)


class PlanModelSchema(ModelSchema):

    prices: List[PriceModelSchema]

    class Meta:
        model = Plan
        fields = "__all__"


class PaymentIntentOutput(Schema):
    id: Optional[str] = None
    amount: Optional[int] = None
    currency: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    invoice_url: Optional[str] = None
    message: Optional[str] = None


class SubscriptionModelSchema(ModelSchema):

    price: PriceModelSchema

    class Meta:
        model = Subscription
        exclude = ["user"]
