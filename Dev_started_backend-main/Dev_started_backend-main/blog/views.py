from uuid import uuid4

from asgiref.sync import sync_to_async
from django.contrib import auth
from django.core.files.storage import default_storage
from django.http import HttpResponseForbidden, JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from thedevstarter_backend import settings

# Create your views here.


@csrf_exempt
async def upload_image(request):

    # Allow only logged in users to upload
    user = await sync_to_async(auth.get_user)(request)
    if not user:
        return HttpResponseForbidden()

    if request.method == "POST":
        file_obj = request.FILES["file"]
        file_name_suffix = file_obj.name.split(".")[-1]
        if file_name_suffix not in [
            "jpg",
            "png",
            "gif",
            "jpeg",
        ]:
            return JsonResponse({"message": "Wrong file format"})

        upload_time = timezone.now()

        file_key = str(uuid4())
        file_name = "".join(file_key)
        file_name = str(file_name) + "." + file_name_suffix

        file_url = f"tinymce/{upload_time.year}/{upload_time.month}/{upload_time.day}/{file_name}"

        file_name = await sync_to_async(default_storage.save)(file_url, file_obj)

        if settings.USE_S3:
            absolute_file_url = f"{settings.MEDIA_ROOT}/{file_name}"
        else:
            absolute_file_url = f"{settings.BASE_URL}/{settings.MEDIA_ROOT}/{file_name}"

        return JsonResponse(
            {"message": "Image uploaded successfully", "location": absolute_file_url}
        )
    return JsonResponse({"detail": "Wrong request"})
