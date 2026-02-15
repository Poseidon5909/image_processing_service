import boto3
from uuid import uuid4
from fastapi import UploadFile

from app.storage.base import StorageBackend
from app.config import settings


class S3Storage(StorageBackend):
    def __init__(self):
        self.bucket_name = settings.S3_BUCKET_NAME

        self.client = boto3.client(
            "s3",
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            region_name=settings.S3_REGION,
        )

    async def save(self, file: UploadFile, filename: str = None) -> str:
        if not filename:
            extension = file.filename.split(".")[-1]
            filename = f"{uuid4().hex}.{extension}"

        content = await file.read()

        self.client.put_object(
            Bucket=self.bucket_name,
            Key=filename,
            Body=content,
            ContentType=file.content_type,
        )

        return f"https://{self.bucket_name}.s3.{settings.S3_REGION}.amazonaws.com/{filename}"

    async def delete(self, file_path: str) -> None:
        key = file_path.split("/")[-1]

        self.client.delete_object(
            Bucket=self.bucket_name,
            Key=key,
        )