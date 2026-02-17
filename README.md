# Image Processing Service

A full-stack image processing platform with user authentication, image transformations, and a dashboard interface. Built to demonstrate modern web development practices and RESTful API design.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Protected Routes**: Role-based access control for authenticated users
- **Image Upload**: Support for multiple image formats
- **Image Transformations**:
  - Resize (custom dimensions)
  - Crop (region selection)
  - Rotate (any angle)
  - Flip (horizontal/vertical)
  - Grayscale filter
  - Sepia filter
  - Format conversion (JPEG, PNG, WEBP)
  - Compression with quality control
- **Metadata Management**: Store and retrieve image processing history
- **Pagination**: Efficient image listing with pagination support
- **Dashboard UI**: User-friendly interface for image management
- **Error Handling**: Comprehensive error states and loading indicators

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database for user and metadata storage
- **SQLAlchemy**: ORM for database interactions
- **python-jose**: JWT token generation and validation
- **passlib**: Secure password hashing with bcrypt
- **Pillow**: Image processing library
- **slowapi**: Rate limiting middleware
- **Local Storage**: File system storage for uploaded images

### Frontend
- **Next.js**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: HTTP client for backend communication

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js (TypeScript + Tailwind)                     │   │
│  │  - Authentication Pages (Login/Register)             │   │
│  │  - Dashboard (Image Gallery)                         │   │
│  │  - Upload & Transform Components                     │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         │ JWT Authentication
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  FastAPI Application                                 │   │
│  │  - Auth Routes (JWT)                                 │   │
│  │  - Image Routes (CRUD)                               │   │
│  │  - Transform Routes (Image Processing)               │   │
│  │  - Rate Limiting Middleware                          │   │
│  └──────────────┬────────────────────────┬──────────────┘   │
│                 │                        │                  │
│                 ▼                        ▼                  │
│  ┌──────────────────────┐  ┌─────────────────────────┐     │
│  │  PostgreSQL Database │  │  Local File Storage     │     │
│  │  - Users             │  │  - Uploaded Images      │     │
│  │  - Image Metadata    │  │  - Processed Images     │     │
│  └──────────────────────┘  └─────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure environment variables (create `.env` file):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/imagedb
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

6. Initialize the database:
```bash
# Ensure PostgreSQL is running and database is created
createdb imagedb
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create `.env.local` file):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Project

### Start Backend Server

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
API documentation: `http://localhost:8000/docs`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Purpose

This project was built as a learning exercise and portfolio piece to demonstrate:

- Full-stack development capabilities
- RESTful API design and implementation
- User authentication and authorization
- Image processing and file handling
- Modern frontend development with React/Next.js
- Database design and ORM usage
- Clean code architecture and separation of concerns

## Project Structure

```
image_processing_service/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── config.py            # Configuration management
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── schemas.py           # Pydantic schemas
│   │   ├── security.py          # Password hashing utilities
│   │   ├── jwt.py               # JWT token handling
│   │   ├── services/
│   │   │   └── image_transformer.py  # Image processing logic
│   │   └── storage/
│   │       ├── base.py          # Storage interface
│   │       ├── local.py         # Local storage implementation
│   │       └── factory.py       # Storage factory pattern
│   ├── uploads/                 # Local image storage
│   └── requirements.txt
│
└── frontend/
    ├── app/
    │   ├── page.tsx             # Landing page
    │   ├── login/               # Login page
    │   ├── register/            # Registration page
    │   └── dashboard/           # Dashboard page
    ├── components/
    │   ├── Navbar.tsx           # Navigation component
    │   ├── UploadForm.tsx       # Image upload component
    │   ├── TransformPanel.tsx   # Transformation controls
    │   ├── ImageCard.tsx        # Image display component
    │   └── withAuth.tsx         # Authentication HOC
    └── lib/
        ├── api.ts               # API client
        └── config.ts            # Frontend configuration
```

## Deployment

### Frontend Deployment

The frontend is ready for deployment to Vercel or other platforms.

**Quick Deploy to Vercel:**

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Set root directory to `frontend`
5. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_ENV`: `production`
6. Click Deploy

For detailed instructions, see [frontend/VERCEL_DEPLOY.md](frontend/VERCEL_DEPLOY.md)

For other deployment options, see [frontend/DEPLOYMENT.md](frontend/DEPLOYMENT.md)

### Backend Deployment

The backend can be deployed to platforms like Railway, Render, or AWS.

**Requirements:**
- PostgreSQL database
- Python 3.8+
- Environment variables configured

## License

This project is open source and available for educational purposes.
