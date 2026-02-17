# Image Processing Service - Frontend

Modern Next.js frontend for the Image Processing Service with JWT authentication and real-time image transformations.

## Features

✅ **User Authentication**
- JWT-based login and registration
- Secure token storage
- Auto-logout on session expiry

✅ **Image Management**
- Upload images (JPEG, PNG, WebP)
- View image gallery
- Download original images
- Track transformation history

✅ **Image Transformations**
- Resize (custom dimensions)
- Rotate (any angle)
- Grayscale filter
- Sepia filter
- Format conversion (JPEG, PNG, WebP)

✅ **UI/UX**
- Responsive design (mobile & desktop)
- Loading spinners
- Error handling with fallback UI
- Real-time feedback
- Context-aware navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS-in-JS (inline styles)
- **State Management**: React Hooks
- **Authentication**: JWT tokens
- **API Client**: Fetch API

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with ErrorBoundary
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── dashboard/
│   │   └── page.tsx        # Protected dashboard
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── register/
│       └── page.tsx        # Register page
├── components/
│   ├── ErrorBoundary.tsx   # Error boundary component
│   ├── ImageCard.tsx       # Image display component
│   ├── LoadingSpinner.tsx  # Loading indicator
│   ├── Navbar.tsx          # Navigation bar
│   ├── TransformPanel.tsx  # Transformation UI
│   ├── UploadForm.tsx      # File upload form
│   └── withAuth.tsx        # HOC for protected routes
├── lib/
│   ├── api.ts              # API utility functions
│   └── config.ts           # Environment configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend server running on port 8000

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_ENV=development
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Component Architecture

### Authentication Flow

```
withAuth HOC → Check localStorage token → Redirect if invalid
                                       ↓
                                   Render protected page
```

### Data Flow

```
Dashboard → fetches images → passes to ImageCard
                            ↓
ImageCard → displays image → TransformPanel (on click)
                           ↓
TransformPanel → transforms → callback to Dashboard → refresh
```

### Error Handling

- **API Errors**: Specific messages (401, 403, 404, 500)
- **Network Errors**: "Check your connection"
- **Component Errors**: ErrorBoundary with refresh option

## API Integration

All API calls go through `lib/api.ts`:

- **Authentication**: `login()`, `register()`, `logout()`
- **Images**: `uploadImage()`, `getUserImages()`, `transformImage()`
- **Token Management**: `getToken()`, `setToken()`, `removeToken()`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_ENV` | Environment | `development` or `production` |

## Production Deployment

1. **Build production bundle**:
   ```bash
   npm run build
   ```

2. **Update environment variables**:
   Edit `.env.production` with production API URL

3. **Start production server**:
   ```bash
   npm start
   ```

4. **Deploy to hosting** (Vercel, Netlify, etc.):
   - Push to Git repository
   - Connect to hosting platform
   - Set environment variables in dashboard
   - Deploy automatically

## Performance Optimizations

- Lazy loading images (`loading="lazy"`)
- Component memoization (React.memo)
- Error boundaries for graceful failures
- Centralized config for easy updates
- Minimal re-renders with proper state management

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

**Problem**: Images not loading
- **Solution**: Check `NEXT_PUBLIC_API_URL` in `.env.local`

**Problem**: Login fails
- **Solution**: Ensure backend is running on port 8000

**Problem**: "Session expired" error
- **Solution**: Normal behavior when JWT expires, just log in again

**Problem**: Build errors
- **Solution**: Run `npm install` and check Node.js version (18+)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is part of the Image Processing Service learning project.

## Support

For issues and questions, please open an issue in the GitHub repository.

