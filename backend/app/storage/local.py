import os
from uuid import uuid4
from fastapi import UploadFile

from app.storage.base import StorageBackend


class LocalStorage(StorageBackend):
    def __init__(self, upload_dir: str = "uploads"):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    async def save(self, file: UploadFile, filename: str = None) -> str:
        if not filename:
            extension = file.filename.split(".")[-1]
            filename = f"{uuid4().hex}.{extension}"

        file_path = os.path.join(self.upload_dir, filename)

        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        return file_path

    async def delete(self, file_path: str) -> None:
        if os.path.exists(file_path):
            os.remove(file_path)