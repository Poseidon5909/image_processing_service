from pydantic import BaseModel, EmailStr, validator
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
  
  @validator('password')
  def validate_password(cls, v):
    if len(v) < 6:
      raise ValueError('Password must be at least 6 characters')
    if len(v) > 72:
      raise ValueError('Password cannot exceed 72 characters')
    return v

class UserLogin(BaseModel):
  email: EmailStr
  password: str
