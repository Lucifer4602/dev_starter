

# TODOs:

* Test payment cancellations
* Test payment upgrades etc.




## Marketing and business

* Fire up a landing page for the template


* Analytics https://www.freecodecamp.org/news/how-to-create-an-analytics-dashboard-in-django-app/



* Add Aync streaming support
[here](https://stackoverflow.com/questions/63316840/django-3-1-streaminghttpresponse-with-an-async-generator#:~:text=Documentation%20for%20Django%203.1%20says,and%20other%20exciting%20response%20types.)

```py
import asyncio

# By design asyncio does not allow its event loop to be nested.
# Trying to do so will give the error "RuntimeError: This event loop is already running".
# This library solves that problem.
import nest_asyncio

from django.http.response import StreamingHttpResponse


class AsyncStreamingHttpResponse(StreamingHttpResponse):

    def __init__(self, streaming_content=(), *args, **kwargs):
        sync_streaming_content = self.get_sync_iterator(streaming_content)
        super().__init__(streaming_content=sync_streaming_content, *args, **kwargs)

    @staticmethod
    async def convert_async_iterable(stream):
        """Accepts async_generator and async_iterator"""
        return iter([chunk async for chunk in stream])

    def get_sync_iterator(self, async_iterable):
        nest_asyncio.apply()

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(self.convert_async_iterable(async_iterable))
        return result
```
