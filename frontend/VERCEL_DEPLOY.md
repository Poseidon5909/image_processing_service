# Deploy to Vercel - Quick Start Guide

This guide will help you deploy your Image Processing Service frontend to Vercel in minutes.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com) - free tier available)
- Your code pushed to a GitHub repository
- Backend API URL (if backend is already deployed)

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

If you haven't already, push your code:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `image_processing_service` repository
5. Configure the project:

   **Framework Preset:** Next.js (should auto-detect)
   
   **Root Directory:** `frontend`
   
   **Build and Output Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Set Environment Variables

In the deployment configuration page, add these environment variables:

```
NEXT_PUBLIC_API_URL = https://your-backend-api.com
NEXT_PUBLIC_ENV = production
```

**Important:** Replace `https://your-backend-api.com` with your actual backend URL.

If your backend isn't deployed yet, you can use `http://localhost:8000` temporarily and update it later.

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://your-project-name.vercel.app`

### Step 5: Update Backend CORS

Update your backend to allow requests from your Vercel domain:

```python
# backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-project-name.vercel.app"  # Add your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy from Frontend Directory

```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? `image-processing-service`
- In which directory is your code located? `./`

### Step 4: Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_API_URL
# Enter your backend URL when prompted

vercel env add NEXT_PUBLIC_ENV
# Enter: production
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

## Post-Deployment Checklist

After deployment, verify:

- [ ] Frontend loads at your Vercel URL
- [ ] No console errors in browser
- [ ] Environment variables are set correctly
- [ ] Login/Register pages are accessible
- [ ] Backend CORS allows your Vercel domain
- [ ] SSL certificate is active (automatic with Vercel)

## Updating Your Deployment

### Update Environment Variables

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add/Edit/Delete variables
4. Redeploy to apply changes

### Update Code

Simply push to your GitHub repository:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel will automatically redeploy! 🚀

## Custom Domain (Optional)

### Add Your Own Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `myapp.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:
- Missing environment variables
- Node version mismatch
- Dependency installation errors

**Solution:** Ensure all environment variables are set and Node version is 20+.

### API Calls Fail (CORS Error)

**Symptom:** Console shows CORS policy errors

**Solution:** 
1. Add your Vercel URL to backend CORS origins
2. Ensure backend API URL uses HTTPS (if in production)
3. Redeploy backend with updated CORS settings

### Environment Variables Not Working

**Solution:**
1. Ensure variables start with `NEXT_PUBLIC_`
2. After changing variables, trigger a new deployment
3. Check Vercel dashboard → Deployments → Latest → Environment Variables

### 404 on Page Refresh

This shouldn't happen with Next.js, but if it does:
- Check `vercel.json` is properly configured
- Ensure you're using Next.js App Router

## Monitoring & Logs

Access deployment logs:
1. Go to your project in Vercel
2. Click on deployments
3. Click on any deployment to view logs

## Performance Tips

Your frontend is already optimized with:
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Edge caching
- ✅ Compression enabled
- ✅ Security headers configured

## Cost

Vercel Free Tier includes:
- Unlimited projects
- HTTPS/SSL included
- 100GB bandwidth/month
- Fast global CDN
- Automatic deployments

Perfect for personal projects and portfolios!

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Check the main [DEPLOYMENT.md](./DEPLOYMENT.md) for more options

## Quick Commands Reference

```bash
# Login to Vercel
vercel login

# Deploy (development)
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View project info
vercel inspect

# Remove project
vercel remove
```

---

**That's it!** Your frontend is now deployed and accessible worldwide. 🎉
