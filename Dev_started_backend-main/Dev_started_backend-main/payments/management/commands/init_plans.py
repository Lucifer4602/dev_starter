import django
import stripe
from django.core.management.base import BaseCommand
from dotenv import find_dotenv, load_dotenv

from payments.utils import upsert_prices, upsert_products
from thedevstarter_backend import settings

load_dotenv(find_dotenv(), override=True)


django.setup()

stripe.api_key = settings.STRIPE_SECRET_KEY


def get_all_products():

    limit = 1
    resp = stripe.Product.list(limit=limit, active=True)
    all_products = []

    has_more = resp["has_more"]

    if "data" in resp and isinstance(resp["data"], list) and len(resp["data"]) > 0:
        all_products.extend(resp["data"])

    while has_more is not False:

        if "data" in resp and isinstance(resp["data"], list) and len(resp["data"]) > 0:
            starting_after = resp["data"][-1]["id"]
            resp = stripe.Product.list(
                limit=limit, starting_after=starting_after, active=True
            )
            all_products.extend(resp["data"])
        else:
            break

    upsert_products(all_products)


def get_all_prices():
    limit = 1
    resp = stripe.Price.list(limit=limit, active=True)
    all_prices = []
    has_more = resp["has_more"]
    if "data" in resp and isinstance(resp["data"], list) and len(resp["data"]) > 0:
        all_prices.extend(resp["data"])

    while has_more is not False:

        if "data" in resp and isinstance(resp["data"], list) and len(resp["data"]) > 0:
            starting_after = resp["data"][-1]["id"]
            resp = stripe.Price.list(
                limit=limit, starting_after=starting_after, active=True
            )
            all_prices.extend(resp["data"])

        else:
            break
    upsert_prices(all_prices)


class Command(BaseCommand):
    def handle(self, **options):
        # get_all_products()
        get_all_prices()
