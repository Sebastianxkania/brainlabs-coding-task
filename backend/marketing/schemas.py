from typing import Literal
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from uuid import UUID

Status = Literal["draft", "active", "paused", "completed"]


class CampaignCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    budget: float = Field(gt=0)
    spend: float = Field(ge=0, default=0)
    status: Status = "draft"


class CampaignResponse(CampaignCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
