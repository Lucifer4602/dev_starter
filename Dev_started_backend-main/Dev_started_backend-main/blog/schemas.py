from __future__ import annotations

from datetime import datetime

from ninja import Schema

# category = models.ForeignKey( Category,on_delete=models.CASCADE,related_name='categories')
# title = models.CharField(max_length=200, unique=True)
# slug = models.SlugField(max_length=200, unique=True, editable=False)
# author = models.ForeignKey(User, on_delete= models.CASCADE)
# updated_on = models.DateTimeField(auto_now= True)
# content = HTMLField()
# created_on = models.DateTimeField(auto_now_add=True)
# read_count = models.IntegerField(default=0, editable=False)
# read_time = models.IntegerField(default=0, editable=False)
# likes = models.ManyToManyField(User, blank=True, related_name='post_likes')
# image =


class CategoryBase(Schema):
    title: str
    id: int


class CommentBase(Schema):
    name: str
    body: str
    created_on: datetime


class AuthorOutputSchema(Schema):
    username: str
    full_name: str


class PostBase(Schema):

    category: CategoryBase | None = None
    title: str
    slug: str
    author: AuthorOutputSchema | None = None
    updated_on: datetime
    content: str | None = None
    created_on: datetime
    read_count: int | None = None
    read_time: int | None = None
    likes_count: int | None = None
    image: str | None = None


class PostDetail(PostBase):

    comments: list[CommentBase] = []
    likes: list[str] = []
