from django.db import models

from thedevstarter_backend import settings

# Create your models here.


class ChatHistory(models.Model):

    chat_id = models.UUIDField(db_index=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    chat_data = models.JSONField(default={})
    title = models.CharField(max_length=100)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.title} + {self.created_at}"


class ChatLimit(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=False, on_delete=models.CASCADE
    )
    chat_limit = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} + {self.chat_limit}"
