from ninja import NinjaAPI

from affiliate.api import router as affiliate_router
from authentication.api import router as authentication_router
from authentication.auth_controllers import AuthBearer
from blog.api import router as blog_router
from chat.api import router as chat_router
from communication.api import router as communication_router
from payments.api import router as payments_router

api = NinjaAPI(auth=AuthBearer())
"""
Add default auth as Token auth and for each open endpoint we can override it using auth=None
"""


"""
Import the API routers from all the active apps and attach to main API instance here :
"""
api.add_router("/payments/", payments_router)
api.add_router("/authentication/", authentication_router)
api.add_router("/communication", communication_router)
api.add_router("/blog/", blog_router)
api.add_router("/chat", chat_router)
api.add_router("/affiliate", affiliate_router)


@api.get("/", auth=None)
def list_events(request):
    return "Glories to the creator"
