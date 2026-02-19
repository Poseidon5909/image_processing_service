from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime

class ImageResponse(BaseModel):
  id: int
  filename: str
  created_at: datetime
  transformation_count: int

  class Config:
    from_attributes = True

class PaginatedImages(BaseModel):
  total: int
  page: int
  size: int
  items: List[ImageResponse]

class UserCreate(BaseModel):
  email: EmailStr
  password: str

class UserLogin(BaseModel):
  email: EmailStr
  password: str
