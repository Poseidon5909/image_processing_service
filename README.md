# Image Processing Service 🎨

**Live Demo**: https://image-processing-service-navy.vercel.app

A secure image processing platform with user authentication, advanced image transformations, and a modern dashboard interface. Built with FastAPI backend and Next.js frontend.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Image Upload**: Support for multiple image formats (JPEG, PNG, WEBP)
- **Advanced Transformations**:
  - Resize with custom dimensions
  - Crop with region selection
  - Rotate at any angle
  - Flip (horizontal/vertical)
  - Grayscale and Sepia filters
  - Format conversion
  - Quality-controlled compression
- **Image Management**: Upload, transform, download, and delete images
- **Metadata Tracking**: Store and retrieve image processing history
- **Pagination**: Efficient image listing with pagination support
- **Dashboard UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Rate Limiting**: API rate limiting for security
- **Error Handling**: Comprehensive error states and loading indicators

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: SQL toolkit and ORM
- **JWT Authentication**: Secure token-based authentication
- **Bcrypt**: Password hashing
- **Pillow**: Advanced image processing library
- **Uvicorn**: ASGI server
- **SlowAPI**: Rate limiting middleware

### Frontend
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Components**: Modular, reusable UI components

## 📋 Prerequisites

- **Python 3.11+** (for backend development)
- **Node.js 20+** (for frontend development)
- **PostgreSQL** (for database)

## 🚀 Quick Start

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/image_processing_service.git
cd image_processing_service
```

**2. Set up the Backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
```

**3. Configure environment variables**

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/imagedb
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**4. Start the Backend**

```bash
uvicorn app.main:app --reload --port 8000
```

- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

**5. Set up the Frontend** (in a new terminal)

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**6. Start the Frontend**

```bash
npm run dev
```

- **Frontend**: http://localhost:3000

## 💻 Local Development

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
image_processing_service/
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI application entry point
│   │   ├── config.py                  # Configuration management
│   │   ├── db.py                      # Database setup
│   │   ├── models.py                  # SQLAlchemy models
│   │   ├── schemas.py                 # Pydantic schemas
│   │   ├── security.py                # Password hashing utilities
│   │   ├── jwt.py                     # JWT token handling
│   │   ├── services/
│   │   │   └── image_transformer.py   # Image processing logic
│   │   └── storage/
│   │       ├── base.py                # Storage interface
│   │       ├── local.py               # Local storage implementation
│   │       ├── cloud.py               # Cloud storage implementation
│   │       └── factory.py             # Storage factory pattern
│   ├── uploads/                       # Local image storage
│   └── requirements.txt
│
└── frontend/
    ├── app/
    │   ├── page.tsx                   # Landing page
    │   ├── layout.tsx                 # Root layout
    │   ├── login/                     # Login page
    │   ├── register/                  # Registration page
    │   └── dashboard/                 # Dashboard page
    ├── components/
    │   ├── Navbar.tsx                 # Navigation component
    │   ├── UploadForm.tsx             # Image upload component
    │   ├── TransformPanel.tsx         # Transformation controls
    │   ├── ImageCard.tsx              # Image display component
    │   ├── LoadingSpinner.tsx         # Loading indicator
    │   ├── ErrorBoundary.tsx          # Error handling
    │   └── withAuth.tsx               # Authentication HOC
    └── lib/
        ├── api.ts                     # API client
        └── config.ts                  # Frontend configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### User
- `GET /auth/me` - Get current user information

### Images
- `GET /images` - List all user's images (with pagination)
- `POST /images/upload` - Upload an image
- `GET /images/{image_id}` - Get image details
- `GET /images/{image_id}/download` - Download an image
- `DELETE /images/{image_id}` - Delete an image

### Transformations
- `POST /images/{image_id}/transform` - Apply transformation to an image
  - Supported operations: resize, crop, rotate, flip, grayscale, sepia, format conversion, compress

## 🎨 Key Features

- **JWT Authentication**: Secure token-based user authentication
- **Password Security**: Bcrypt password hashing
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Secure cross-origin resource sharing
- **Image Processing**: Powered by Pillow library for high-quality transformations
- **Metadata Tracking**: Complete history of image uploads and transformations
- **Error Handling**: Comprehensive error handling with detailed messages
- **Responsive Design**: Mobile-friendly UI that works on all devices

## 🖥️ Frontend Pages

- **Landing Page**: Welcome screen with app introduction
- **Register**: User registration form with validation
- **Login**: User authentication page
- **Dashboard**: 
  - Image gallery with grid layout
  - Upload interface
  - Transformation panel with live preview
  - Download and delete capabilities
  - Pagination controls

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `hashed_password` - Bcrypt hashed password
- `created_at` - Account creation timestamp

### ImageMetadata Table
- `id` - Primary key
- `user_id` - Foreign key to Users
- `original_filename` - Original file name
- `stored_filename` - Stored file name on server
- `file_path` - File storage path
- `file_size` - File size in bytes
- `mime_type` - Image MIME type
- `width` - Image width in pixels
- `height` - Image height in pixels
- `format` - Image format (JPEG, PNG, WEBP)
- `created_at` - Upload timestamp
- `last_modified` - Last modification timestamp

## 🚢 Deployment

### Frontend (Vercel)
The frontend is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Set root directory to `frontend`
5. Add environment variable: `NEXT_PUBLIC_API_URL`
6. Deploy!

📖 [Detailed Frontend Deployment Guide](frontend/VERCEL_DEPLOY.md)

### Backend (Render)
The backend can be deployed to Render with PostgreSQL:

1. Push your code to GitHub
2. Create PostgreSQL database on Render
3. Create a Web Service pointing to `backend` directory
4. Configure environment variables
5. Deploy!

📖 [Detailed Backend Deployment Guide](backend/RENDER_DEPLOY.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- **FastAPI** for the excellent backend framework
- **Next.js** team for the amazing React framework
- **Tailwind CSS** for the beautiful styling utilities
- **Pillow** for powerful image processing capabilities
- **PostgreSQL** for reliable database management
