from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import redirect

from authentication.utils import Token
from payments.models import Subscription, UserLimit
from thedevstarter_backend import settings

from .models import ApiKey, User

# Register your models here.


class SubscriptionInline(admin.TabularInline):
    model = Subscription
    extra = 0


class UserLimitInline(admin.TabularInline):
    model = UserLimit
    extra = 0


class ApiKeyInline(admin.TabularInline):
    model = ApiKey
    extra = 0


frontend_site_url = settings.FRONTEND_SITE_URL or "http://localhost:3000"


class UserAdmin(admin.ModelAdmin):
    inlines = [SubscriptionInline, UserLimitInline, ApiKeyInline]

    actions = ["impersonate_user"]
    search_fields = ["email", "first_name", "last_name"]

    @admin.action(description="Impersonate User")
    def impersonate_user(self, request, queryset):
        if queryset and len(queryset) == 1:
            user = queryset[0]
            token_handler = Token()
            token_payload = token_handler.get_token_payload(user)
            token_payload["is_impersonated"] = True

            token = token_handler.encode_jwt(token_payload, expiry_hours=0.25)
            return redirect(f"{frontend_site_url}?ImpersonationToken={token}")
        else:
            return HttpResponse(
                status=500, content="Please select a single user to impersonate"
            )


admin.site.register(User, UserAdmin)

admin.site.register(UserLimit)
admin.site.register(ApiKey)
