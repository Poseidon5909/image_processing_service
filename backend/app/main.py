from slowapi import Limiter
from fastapi import Request
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.responses import JSONResponse
from fastapi import UploadFile, File, Depends
from jose import JWTError, jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
security = HTTPBearer()
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
import os
from pathlib import Path
from dotenv import load_dotenv
import uuid
from fastapi.responses import FileResponse
from app.models import ImageTransformation, Image
from app.services.image_transformer import save_image_with_options
from app.services.image_transformer import(
    load_image,
    save_image,
    resize_image,
    crop_image,
    rotate_image,
    flip_horizontal,
    flip_vertical,
    mirror_image
)


# Load .env from project root
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

# Load env vars at module level
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
if not SECRET_KEY or not ALGORITHM:
    raise ValueError(f"Missing env vars - SECRET_KEY: {bool(SECRET_KEY)}, ALGORITHM: {bool(ALGORITHM)}")

from app.db import engine, Base, get_db
from app.models import User, Image
from app.schemas import UserCreate, UserLogin
from app.security import hash_password, verify_password
from app.jwt import create_access_token

app = FastAPI()

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)


@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded. Try again later."},
    )

Base.metadata.create_all(bind=engine)


@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed_pwd = hash_password(user.password)

    new_user = User(
        email=user.email,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


from fastapi.security import OAuth2PasswordRequestForm

@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(db_user.id)})

    return {"access_token": access_token, "token_type": "bearer"}


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    
    # Extract the actual JWT token
    # Handle cases where "Bearer " might be included
    token = token.replace("Bearer ", "").strip()
    
    # Validate token is not empty
    if not token or not isinstance(token, str):
        raise HTTPException(status_code=401, detail="Invalid token: token is empty")

    # Verify token has exactly 3 segments (header.payload.signature)
    segment_count = token.count(".") + 1
    if segment_count != 3:
        raise HTTPException(
            status_code=401, 
            detail=f"Invalid token: has {segment_count} segments, expected 3. Token: {token[:30]}..."
        )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token: missing user_id")
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"JWT decode error: {str(e)}")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user


from fastapi import Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.storage.factory import get_storage
from app.storage.base import StorageBackend
from app.db import get_db
from app.models import Image, User
from app.security import get_current_user


@app.post("/images/upload")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    storage: StorageBackend = Depends(get_storage)
):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Save using storage backend
    file_path = await storage.save(file)

    new_image = Image(
        filename=file.filename,
        file_path=file_path,
        user_id=current_user.id
    )

    db.add(new_image)
    db.commit()
    db.refresh(new_image)

    return {
        "id": new_image.id,
        "filename": new_image.filename,
        "uploaded_by": current_user.email
    }



@app.post("/images/transform")
@limiter.limit("10/minute")
async def transform_image(
    request: Request,
    image_id: int,
    action: str,
    width: int | None = None,
    height: int | None = None,
    left: int | None = None,
    top: int | None = None,
    right: int | None = None,
    bottom: int | None = None,
    angle: int | None = None,
    output_format: str = "jpeg",
    quality: int | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    image_record = db.query(Image).filter(Image.id == image_id).first()
    if not image_record:
        raise HTTPException(status_code=404, detail="Image not found")

    input_path = Path(image_record.file_path)
    image = load_image(input_path)

    # Apply transformation
    if action == "resize":
        if width is None or height is None:
            raise HTTPException(status_code=400, detail="Width and height required")
        image = resize_image(image, width, height)

    elif action == "crop":
        if None in (left, top, right, bottom):
            raise HTTPException(status_code=400, detail="Crop coordinates required")
        image = crop_image(image, left, top, right, bottom)

    elif action == "rotate":
        if angle is None:
            raise HTTPException(status_code=400, detail="Angle required")
        image = rotate_image(image, angle)

    elif action == "flip_horizontal":
        image = flip_horizontal(image)

    elif action == "flip_vertical":
        image = flip_vertical(image)

    elif action == "mirror":
        image = mirror_image(image)

    else:
        raise HTTPException(status_code=400, detail="Invalid action")

    # Save to memory buffer
    output_filename = f"{uuid.uuid4()}.{output_format.lower()}"
    buffer = BytesIO()

    image.save(
        buffer,
        format=output_format.upper(),
        quality=quality if quality else 85
    )

    buffer.seek(0)

    # Use storage abstraction
    storage = get_storage()

    output_path = await storage.save(
        file=UploadFile(
            filename=output_filename,
            file=buffer,
            content_type=f"image/{output_format.lower()}"
        )
    )

    # Track used parameters
    params_used = {
        k: v for k, v in {
            "width": width,
            "height": height,
            "left": left,
            "top": top,
            "right": right,
            "bottom": bottom,
            "angle": angle,
            "output_format": output_format,
            "quality": quality
        }.items() if v is not None
    }

    existing_transformation = db.query(ImageTransformation).filter(
        ImageTransformation.image_id == image_id,
        ImageTransformation.action == action,
        ImageTransformation.params == str(params_used)
    ).first()

    if existing_transformation:
        return {
            "message": "Transformation already exists",
            "output_file": Path(existing_transformation.output_file_path).name
        }

    transformation = ImageTransformation(
        image_id=image_id,
        action=action,
        params=str(params_used),
        output_file_path=str(output_path)
    )

    db.add(transformation)
    db.commit()

    return {
        "original_image_id": image_id,
        "action": action,
        "output_file": output_filename
    }

@app.get("/images/{image_id}")
def get_image(
    image_id: int,
    transformation_id: int | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    image = db.query(Image).filter(
        Image.id == image_id,
        Image.user_id == current_user.id
    ).first()

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    # If transformation requested
    if transformation_id:
        transformation = db.query(ImageTransformation).filter(
            ImageTransformation.id == transformation_id,
            ImageTransformation.image_id == image_id
        ).first()

        if not transformation:
            raise HTTPException(status_code=404, detail="Transformation not found")

        file_path = Path(transformation.output_file_path)
    else:
        file_path = Path(image.file_path)

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found on disk")

    return FileResponse(path=file_path)

from app.schemas import ImageResponse, PaginatedImages
from typing import List

@app.get("/images", response_model=PaginatedImages)
def list_user_images(
    page: int = 1,
    size: int = 5,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if page < 1 or size < 1:
        raise HTTPException(status_code=400, detail="Page and size must be positive")

    query = db.query(Image).filter(Image.user_id == current_user.id)

    total = query.count()

    images = (
        query
        .offset((page - 1) * size)
        .limit(size)
        .all()
    )

    result = []

    for image in images:
        result.append({
            "id": image.id,
            "filename": image.filename,
            "created_at": image.created_at,
            "transformation_count": len(image.transformations)
        })

    return {
        "total": total,
        "page": page,
        "size": size,
        "items": result
    }
