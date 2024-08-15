from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Plan, Price, Subscription

# Register your models here.


class PriceInline(admin.TabularInline):
    model = Price


class PlanAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [PriceInline]


class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_on", "updated_on")
    search_fields = [
        "status",
        "user__email",
        "user__username",
        "stripe_subscription_id",
    ]


admin.site.register(Plan, PlanAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(Price)
