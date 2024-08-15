from django.urls import path

from .views import upload_image

urlpatterns = [
    path("upload_image/", upload_image),
]
