import json
from operator import itemgetter
from typing import List

from asgiref.sync import sync_to_async
from django_async_stream import AsyncStreamingHttpResponse
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate
from langchain.schema import format_document
from langchain_community.vectorstores.qdrant import Qdrant
from langchain_core.messages import get_buffer_string
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from ninja import Router
from ninja.errors import HttpError
from qdrant_client import QdrantClient

from chat.models import ChatHistory, ChatLimit
from chat.schemas import ChatHistoryOutput, ChatInput
from thedevstarter_backend import settings

router = Router()

embedding = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
OUTPUT_KEY = "answer"


@router.post("/sse")
async def chat(request, input_data: ChatInput):
    chat_limit = await sync_to_async(
        ChatLimit.objects.filter(user=request.user).first
    )()
    if chat_limit is not None:
        print("UPDATING CHAT LIMIT")
        if chat_limit.chat_limit >= 5:
            raise HttpError(402, "You have reached your chat limit")
        chat_limit.chat_limit = chat_limit.chat_limit + 1
        await chat_limit.asave()
    else:
        print("CREATING NEW CHAT LIMIT")
        await ChatLimit.objects.acreate(user=request.user, chat_limit=1)
    question = input_data.question
    chat_id = input_data.chat_id

    chat_data = []
    chat_history = await sync_to_async(
        ChatHistory.objects.filter(chat_id=chat_id).first
    )()
    if chat_history is not None:
        chat_data = chat_history.chat_data
    else:
        chat_history = await ChatHistory.objects.acreate(
            chat_id=chat_id, chat_data=[], title=question, user=request.user
        )
        chat_data = chat_history.chat_data

    client = QdrantClient(
        host=settings.QDRANT_HOST, prefer_grpc=False, api_key=settings.QDRANT_API_KEY
    )
    qdrant = Qdrant(
        collection_name=settings.QDRNAT_COLLECTION_NAME,
        client=client,
        embeddings=embedding,
    )

    retriever = qdrant.as_retriever()

    _template = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:"""
    CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

    memory = ConversationBufferMemory(
        return_messages=True, output_key=OUTPUT_KEY, input_key="question"
    )

    loaded_memory = RunnablePassthrough.assign(
        chat_history=RunnableLambda(memory.load_memory_variables)
        | itemgetter("history"),
    )
    print("loaded memory ---<><>", loaded_memory)
    standalone_question = {
        "standalone_question": {
            "question": lambda x: x["question"],
            "chat_history": lambda x: get_buffer_string(x["chat_history"]),
        }
        | CONDENSE_QUESTION_PROMPT
        | ChatOpenAI(temperature=0)
        | StrOutputParser(),
    }

    template = """ You are a helpful assistant,
    {context}

    Question: {question}
    """
    ANSWER_PROMPT = ChatPromptTemplate.from_template(template)

    DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")

    def _combine_documents(
        docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n"
    ):
        doc_strings = [format_document(doc, document_prompt) for doc in docs]
        return document_separator.join(doc_strings)

    # Now we retrieve the documents
    retrieved_documents = {
        "docs": itemgetter("standalone_question") | retriever,
        "question": lambda x: x["standalone_question"],
    }
    # Now we construct the inputs for the final prompt
    final_inputs = {
        "context": lambda x: _combine_documents(x["docs"]),
        "question": itemgetter("question"),
    }
    # And finally, we do the part that returns the answers
    answer = {
        "answer": final_inputs | ANSWER_PROMPT | ChatOpenAI(),
        "docs": itemgetter("docs"),
    }
    # And now we put it all together!
    final_chain = loaded_memory | standalone_question | retrieved_documents | answer

    inputs = {"question": question, "chat_history": chat_data}

    async def generate_results(chat_data: List, chat_history: ChatHistory):

        try:
            final_answer = ""
            for chunk in final_chain.stream(inputs):

                if "answer" in chunk:
                    final_answer += f"{chunk['answer'].content}"
                    yield json.dumps(
                        {"event": "update", "data": f"{chunk['answer'].content}"}
                    )

            chat_data.append({"message": question, "sent": True})
            chat_data.append({"message": final_answer, "sent": False})
            chat_history.chat_data = chat_data
            await chat_history.asave()

        except Exception as e:
            print("ERROR ---<><>", e)

    response = AsyncStreamingHttpResponse(
        generate_results(chat_data, chat_history), content_type="text/event-stream"
    )

    return response


@router.get("/chat-history", response=List[ChatHistoryOutput])
async def chat_history(request):

    user = request.user
    chat_histories = await sync_to_async(list)(
        ChatHistory.objects.filter(user=user).all()
    )

    return chat_histories
