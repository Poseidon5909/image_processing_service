# Frontend Deployment Guide

This guide provides instructions for deploying the Image Processing Service frontend to various platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Docker](#docker)
  - [Traditional Server](#traditional-server)
- [Post-Deployment](#post-deployment)

## Prerequisites

1. Backend API deployed and accessible via HTTPS
2. Node.js 20+ installed locally
3. Project dependencies installed (`npm install`)
4. Successful local build (`npm run build`)

## Environment Variables

The frontend requires the following environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_ENV=production
```

**Important:** Update `.env.production.local` with your actual backend API URL before deploying.

## Deployment Platforms

### Vercel (Recommended)

Vercel is the easiest platform for Next.js deployment.

#### Method 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel --prod
```

5. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
   - Add `NEXT_PUBLIC_ENV` with value `production`

#### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_ENV`: `production`
7. Click "Deploy"
### Docker

Deploy using Docker for containerized deployment.

#### Using the Dockerfile

1. Build the image:
```bash
cd frontend
docker build -t image-processing-frontend .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-backend-api.com \
  -e NEXT_PUBLIC_ENV=production \
  image-processing-frontend
```

#### Using Docker Compose

Create `docker-compose.yml` in the frontend directory:

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://your-backend-api.com
      - NEXT_PUBLIC_ENV=production
```

Deploy:
```bash
docker-compose up -d
```

### Traditional Server (VPS/Dedicated)

Deploy on a traditional server like AWS EC2, DigitalOcean, etc.

1. SSH into your server

2. Install Node.js 20+:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Install PM2:
```bash
sudo npm install -g pm2
```

4. Clone your repository:
```bash
git clone https://github.com/your-username/image_processing_service.git
cd image_processing_service/frontend
```

5. Install dependencies:
```bash
npm install
```

6. Create `.env.production.local`:
```bash
echo "NEXT_PUBLIC_API_URL=https://your-backend-api.com" > .env.production.local
echo "NEXT_PUBLIC_ENV=production" >> .env.production.local
```

7. Build the application:
```bash
npm run build
```

8. Start with PM2:
```bash
pm2 start npm --name "frontend" -- start
pm2 save
pm2 startup
```

9. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

10. Setup SSL with Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Post-Deployment

### Verification Checklist

- [ ] Frontend loads without errors
- [ ] Can navigate to login page
- [ ] Can navigate to register page
- [ ] Environment variables are correctly set
- [ ] API calls connect to correct backend
- [ ] CORS is properly configured on backend
- [ ] SSL/HTTPS is working (for production)

### Testing the Deployment

1. Open the deployed URL
2. Check browser console for errors
3. Test user registration
4. Test user login
5. Test image upload (if backend is deployed)
6. Test image transformations

### Common Issues

#### CORS Errors
If you see CORS errors, update your backend CORS configuration to allow your frontend domain:

```python
# backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Environment Variables Not Loading
- Ensure variables start with `NEXT_PUBLIC_`
- Rebuild and redeploy after changing environment variables
- Check platform-specific environment variable settings

#### Build Failures
- Clear cache and rebuild: `rm -rf .next && npm run build`
- Check Node.js version compatibility
- Verify all dependencies are installed

### Monitoring

Set up monitoring for your deployed frontend:

- **Vercel:** Built-in analytics and logs
- **Netlify:** Built-in analytics and logs
- **Custom Server:** Use PM2 logs (`pm2 logs frontend`)

### Continuous Deployment

For automatic deployments on git push:

1. **Vercel/Netlify:** Automatically configured when connected to GitHub
2. **Custom Server:** Set up GitHub Actions (see `.github/workflows/deploy.yml`)

## Support

For issues or questions:
- Check the [main README](../README.md)
- Review Next.js deployment documentation
- Check platform-specific documentation

## Security Notes

- Never commit `.env.production.local` to version control
- Use HTTPS for production deployments
- Keep dependencies updated
- Enable security headers (already configured in `next.config.ts`)
- Use environment secrets for sensitive values
