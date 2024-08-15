from typing import List, Optional

from asgiref.sync import sync_to_async
from django.db.models import Count
from django.http import HttpResponse
from ninja import Router

from thedevstarter_backend import settings
from utils.common import get_absolute_url

from .models import Category, Post
from .schemas import AuthorOutputSchema, CategoryBase, PostBase, PostDetail

router = Router()


@router.get("/categories", response=List[CategoryBase], auth=None)
async def get_categories(request):
    categories = await sync_to_async(list)(Category.objects.all())

    return [CategoryBase(title=x.title, id=x.pk) for x in categories]


@router.get("/blogs", response=List[PostBase], auth=None)
async def get_blogs(
    request,
    page: int = 1,
    page_size: int = 10,
    category: Optional[str] = None,
    author: Optional[str] = None,
):
    offset = page_size * (page - 1)

    fetched_blogs = []
    blogs = (
        Post.objects.annotate(likes_count=Count("likes"))
        .select_related("author")
        .select_related("category")
    )
    if category is not None and category != "":
        blogs = blogs.filter(category__title=category)

    if author is not None and author != "":
        blogs = blogs.filter(author__username=author)

    blogs = blogs.all()[offset : offset + page_size]

    async for blog in blogs:
        fetched_blogs.append(
            PostBase(
                author=AuthorOutputSchema(
                    username=blog.author.username,
                    full_name=f"{blog.author.first_name} {blog.author.last_name}",
                ),
                slug=blog.slug,
                category=CategoryBase(title=blog.category.title, id=blog.category.pk)
                if blog.category.title
                else None,
                title=blog.title,
                updated_on=blog.updated_on,
                content=blog.content,
                created_on=blog.created_on,
                read_count=blog.read_count,
                read_time=blog.read_time,
                likes_count=blog.likes_count,
                image=get_absolute_url(blog.image.url) if blog.image else None,
            )
        )

    return fetched_blogs


@router.get("/blog/{slug}", response=PostDetail, auth=None)
async def blog_detail(request, slug: str):
    blog = await sync_to_async(
        Post.objects.prefetch_related("likes")
        .prefetch_related("comments")
        .select_related("author")
        .select_related("category")
        .filter(slug=slug)
        .first
    )()

    return PostDetail(
        comments=blog.comments.all() if blog.comments else [],
        author=AuthorOutputSchema(
            username=blog.author.username,
            full_name=f"{blog.author.first_name} {blog.author.last_name}",
        ),
        slug=blog.slug,
        category=CategoryBase(title=blog.category.title, id=blog.category.pk)
        if blog.category.title
        else None,
        title=blog.title,
        updated_on=blog.updated_on,
        content=blog.content,
        created_on=blog.created_on,
        read_count=blog.read_count,
        read_time=blog.read_time,
        likes_count=len(blog.likes.all()),
        image=get_absolute_url(blog.image.url),
        likes=[f"{u.first_name} {u.last_name}" for u in blog.likes.all()],
    )


# For search on blog
@router.get("/blogs?query={query}", response=List[PostBase], auth=None)
async def get_blogs_by_category(
    request, query: str, page: int = 1, page_size: int = 10
):
    offset = page_size * (page - 1)
    blogs = (
        Post.objects.prefetch_related("likes")
        .prefetch_related("comments")
        .select_related("author")
        .select_related("category")
        .filter(category__title=query)
        .all()[offset : offset + page_size]
    )

    fetched_blogs = []
    async for blog in blogs:
        fetched_blogs.append(
            PostBase(
                author=AuthorOutputSchema(
                    username=blog.author.username,
                    full_name=f"{blog.author.first_name} {blog.author.last_name}",
                ),
                slug=blog.slug,
                category=CategoryBase(title=blog.category.title, id=blog.category.pk)
                if blog.category.title
                else None,
                title=blog.title,
                updated_on=blog.updated_on,
                content=blog.content,
                created_on=blog.created_on,
                read_count=blog.read_count,
                read_time=blog.read_time,
                likes_count=blog.likes_count,
                image=get_absolute_url(blog.image.url),
            )
        )
    return fetched_blogs


@router.post("/{slug}/read-count", response=int, auth=None)
async def increment_read_count(request, slug: str):
    blog = await Post.objects.aget(slug=slug)

    blog.read_count += 1
    await blog.asave()

    return blog.read_count


@router.get("/sitemap", auth=None)
async def get_sitemap(request):
    blogs = await sync_to_async(list)(Post.objects.values("slug").all())

    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for slug in blogs:
        sitemap_content += "\t<url>\n"
        sitemap_content += f'\t\t<loc>https://{settings.FRONTEND_SITE_URL}/blogs/{slug["slug"]}</loc>\n'
        sitemap_content += "\t</url>\n"

    sitemap_content += "</urlset>"

    return HttpResponse(sitemap_content, content_type="application/xml")
