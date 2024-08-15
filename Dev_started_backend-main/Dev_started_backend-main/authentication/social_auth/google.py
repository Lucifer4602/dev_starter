import base64
import json
from typing import Dict

from utils.AsyncClient import AsyncClient

from .base import BaseOAuth


class GoogleOAuth2(BaseOAuth):

    AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/auth"
    ACCESS_TOKEN_URL = "https://accounts.google.com/o/oauth2/token"
    ACCESS_TOKEN_METHOD = "POST"
    REVOKE_TOKEN_URL = "https://accounts.google.com/o/oauth2/revoke"
    USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo"
    REVOKE_TOKEN_METHOD = "GET"
    DEFAULT_SCOPE = ["openid", "email", "profile"]
    TOKEN_ALGORITHM = ["HS256"]

    def __init__(self, *, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI):

        self.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID
        self.GOOGLE_REDIRECT_URI = GOOGLE_REDIRECT_URI
        self.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET

    async def validate_code(self, code):
        data = {
            "code": code,
            "client_id": self.GOOGLE_CLIENT_ID,
            "client_secret": self.GOOGLE_CLIENT_SECRET,
            "redirect_uri": self.GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        async_client = AsyncClient()

        try:
            status, response = await async_client._request(
                method=self.ACCESS_TOKEN_METHOD, url=self.ACCESS_TOKEN_URL, data=data
            )
            access_token = json.loads(response).get("access_token")

            status, user_info = await async_client.get(
                self.USER_INFO_URL, headers={"Authorization": f"Bearer {access_token}"}
            )
            user_info = json.loads(user_info)
            if "error" in user_info:
                raise ValueError(
                    user_info.get("error", {}).get("message", "AUTH FAILED")
                )

            return user_info
        finally:
            await async_client.close_session()

    def get_auth_url(self, state: Dict = {}):
        state = json.dumps(state)
        encoded_bytes = base64.b64encode(state.encode("utf-8"))
        encoded_string = encoded_bytes.decode("utf-8")
        scope = "%20".join(self.DEFAULT_SCOPE)
        return f"{self.AUTHORIZATION_URL}?response_type=code&client_id={self.GOOGLE_CLIENT_ID}&redirect_uri={self.GOOGLE_REDIRECT_URI}&scope={scope}&access_type=offline&state={encoded_string}"
