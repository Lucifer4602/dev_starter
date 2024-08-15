import aiohttp


class AsyncClient:
    def __init__(self):
        self.session = aiohttp.ClientSession()

    async def close_session(self):
        await self.session.close()

    async def get(self, url, params=None, headers=None, timeout=None):
        return await self._request(
            "GET", url, params=params, headers=headers, timeout=timeout
        )

    async def post(self, url, data=None, headers=None, timeout=None):
        return await self._request(
            "POST", url, data=data, headers=headers, timeout=timeout
        )

    async def delete(self, url, headers=None, timeout=None):
        return await self._request("DELETE", url, headers=headers, timeout=timeout)

    async def patch(self, url, data=None, headers=None, timeout=None):
        return await self._request(
            "PATCH", url, data=data, headers=headers, timeout=timeout
        )

    async def put(self, url, data=None, headers=None, timeout=None):
        return await self._request(
            "PUT", url, data=data, headers=headers, timeout=timeout
        )

    async def _request(
        self, method, url, params=None, data=None, headers=None, timeout=None
    ):
        async with self.session.request(
            method, url, params=params, data=data, headers=headers, timeout=timeout
        ) as response:

            response_text = await response.text()
            return response.status, response_text
