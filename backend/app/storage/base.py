from abc import ABC, abstractmethod


class StorageBackend(ABC):
    @abstractmethod
    async def save(self, file, filename: str = None) -> str:
        """
        Save file and return file path or URL
        """
        pass

    @abstractmethod
    async def delete(self, file_path: str) -> None:
        """
        Delete file from storage
        """
        pass