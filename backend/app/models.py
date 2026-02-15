from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base
from sqlalchemy import DateTime
from datetime import datetime

class User(Base):
  __tablename__ = "users"
  id = Column(Integer, primary_key=True, index=True)
  email = Column(String, unique=True, index=True, nullable=False)
  hashed_password = Column(String, nullable=False)

  images = relationship("Image", back_populates="user", cascade="all, delete")

class Image(Base):
  __tablename__ = "images"

  id = Column(Integer, primary_key=True, index=True)
  filename = Column(String, nullable=False)
  file_path = Column(String, nullable=False)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

  user = relationship("User", back_populates="images")


  created_at = Column(DateTime, default=datetime.utcnow)


from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime


class ImageTransformation(Base):
    __tablename__ = "image_transformations"

    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("images.id"), nullable=False)

    action = Column(String, nullable=False)
    params = Column(String, nullable=False)
    output_file_path = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    image = relationship("Image", backref="transformations")
