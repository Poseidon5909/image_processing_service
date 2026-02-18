from pydantic import BaseModel, EmailStr, field_validator
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
  
  @field_validator('password')
  def validate_password(cls, v):
    if len(v) < 6:
      raise ValueError('Password must be at least 6 characters long')
    if len(v) > 72:
      raise ValueError('Password must be 72 characters or less')
    return v

class UserLogin(BaseModel):
  email: EmailStr
  password: str
