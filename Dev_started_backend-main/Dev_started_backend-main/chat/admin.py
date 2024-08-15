from django.contrib import admin

from .models import ChatHistory, ChatLimit

# Register your models here.


admin.site.register(ChatHistory)
admin.site.register(ChatLimit)
