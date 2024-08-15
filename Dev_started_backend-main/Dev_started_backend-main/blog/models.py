# Create your models here.
from django.db import models
from django.db.models.signals import pre_save
from django.urls import reverse
from django.utils.text import slugify
from tinymce.models import HTMLField

from authentication.models import User
from thedevstarter_backend.models import BaseModel

from .utils import get_read_time


class Category(BaseModel):

    title = models.CharField(max_length=100, unique=True, null=False, blank=False)

    def __str__(self):
        return self.title


class Post(BaseModel):

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="categories"
    )
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = HTMLField()
    read_count = models.IntegerField(default=0, editable=False)
    read_time = models.IntegerField(default=0, editable=False)
    likes = models.ManyToManyField(User, blank=True, related_name="post_likes")
    image = models.ImageField(null=True, blank=True, upload_to="tinymce/images/")

    class Meta:
        ordering = ["-created_on"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("post_detail", kwargs={"slug": self.slug})

    def get_like_url(self):
        return reverse("like-toggle", kwargs={"slug": self.slug})

    def get_api_like_url(self):
        return reverse("like-api-toggle", kwargs={"slug": self.slug})


def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if instance.content:
        instance.read_time = get_read_time(instance.content)


pre_save.connect(pre_save_post_receiver, sender=Post)


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=80)
    body = models.TextField()
    parent = models.ForeignKey(
        "self", null=True, on_delete=models.CASCADE, blank=True, related_name="replies"
    )

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return "Comment {} by {}".format(self.body, self.name)
