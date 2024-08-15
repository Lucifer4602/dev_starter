import asyncio
import json
import logging

from thedevstarter_backend import settings
from utils.AsyncClient import AsyncClient

logger = logging.getLogger(__name__)


async def is_async():
    try:
        asyncio.get_running_loop()
        return True
    except RuntimeError as e:
        print("ERROR IN CHECKING ASYNC--<>", e)
        return False


async def verify_recaptcha(token):
    async_client = AsyncClient()
    try:
        url = f"https://www.google.com/recaptcha/api/siteverify?secret={settings.RECAPTCHA_SECRET_KEY}&response={token}"

        status, response = await async_client.post(url)
        return status, response
    finally:
        await async_client.close_session()


async def add_user_to_brevo(user_data, user_type):
    async_client = AsyncClient()
    try:
        url = "https://api.brevo.com/v3/contacts"

        payload = {
            "attributes": {
                "FIRSTNAME": user_data.first_name,
                "LASTNAME": user_data.last_name,
                "USER_TYPE": user_type,
            },
            "updateEnabled": False,
            "email": user_data.email,
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": settings.BREVO_API_KEY,
        }

        status, response = await async_client.post(
            url, data=json.dumps(payload), headers=headers
        )
        if status != 201:
            logger.error(
                f"\n\n\nfailed to add user contact in brevo {status , response}\n\n\n"
            )
            return

        print("user contact created successfully in brevo", response)
        return
    except Exception as e:
        logger.error(f"\n\n\nfailed to add user contact in brevo {e}\n\n\n")
        print(response)
    finally:
        await async_client.close_session()


async def update_user_of_brevo(user_data, user_type):
    async_client = AsyncClient()
    try:
        url = f"https://api.brevo.com/v3/contacts/{user_data.email}"

        payload = {
            "attributes": {
                "USER_TYPE": user_type,
            },
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": settings.BREVO_API_KEY,
        }

        status, response = await async_client.put(
            url, data=json.dumps(payload), headers=headers
        )
        if status != 204:
            logger.error(
                f"\n\n\nfailed to update user contact in brevo {status , response}\n\n\n"
            )
            return

        print("user contact updated successfully in brevo", response)
        return
    except Exception as e:
        logger.error(f"\n\n\nfailed to update contact in brevo {e}\n\n\n")
        print(response)
    finally:
        await async_client.close_session()


async def add_collaborator_to_repo(username, repo_name):
    try:
        async_client = AsyncClient()
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {settings.GITHUB_ACCESS_TOKEN}",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/x-www-form-urlencoded",
        }

        data = '{"permission":"pull"}'

        status, response = await async_client.put(
            f"https://api.github.com/repos/{settings.GITHUB_OWNER}/{repo_name}/collaborators/{username}",
            headers=headers,
            data=data,
        )

        return status, response

    except Exception as e:
        # Handle other exceptions
        return 500, f"Internal Server Error: {str(e)}"

    finally:
        await async_client.close_session()


async def give_github_repo_access(username, plan=[]):

    for repo in plan.github_repos:

        status, response = await add_collaborator_to_repo(username, repo)
        if status != 201:
            logger.error(
                f"\n\n\nFailed to add collaborator to repo {status}\n\n\n {response} \n\n\n"
            )
            return False
    # You can return the statuses and responses as needed or handle them further if necessary
    return True


def get_absolute_url(url: str):

    if not url:
        return None
    if url.startswith("http://") or url.startswith("https://"):
        return url

    else:
        return f"{settings.BASE_URL}{url}"
