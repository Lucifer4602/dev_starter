from datetime import datetime
from typing import Dict, List
from uuid import UUID

from ninja import Schema


class ChatHistoryOutput(Schema):
    chat_id: UUID
    created_at: datetime
    updated_at: datetime
    chat_data: List[Dict]
    title: str


class ChatInput(Schema):
    question: str
    chat_id: str
