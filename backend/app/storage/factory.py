from functools import lru_cache

from app.storage.local import LocalStorage
from app.storage.cloud import S3Storage
from app.storage.base import StorageBackend
from app.config import settings


@lru_cache()
def get_storage() -> StorageBackend:
    if settings.STORAGE_BACKEND == "local":
        return LocalStorage(upload_dir=settings.UPLOAD_DIR)

    if settings.STORAGE_BACKEND == "s3":
        return S3Storage()

    raise ValueError("Invalid STORAGE_BACKEND configuration")