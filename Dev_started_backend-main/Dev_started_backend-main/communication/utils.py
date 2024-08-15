import json

from thedevstarter_backend import settings


async def handle_news_letter_subscribe(email: str, async_client):

    url = f"https://api.beehiiv.com/v2/publications/{settings.BEEHIV_PUBLICATION_ID}/subscriptions"
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {settings.BEEHIV_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {"email": email}

    status, response_text = await async_client.post(
        url, data=json.dumps(data), headers=headers
    )
    return status, response_text
