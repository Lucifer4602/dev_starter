from ninja import ModelSchema

from affiliate.models import Affiliate


class AffiliateModelSchema(ModelSchema):
    class Meta:
        model = Affiliate
        fields = "__all__"
