# Deploy Backend to Render - Step-by-Step Guide

This guide will help you deploy your FastAPI backend to Render.

## Prerequisites

- GitHub account with your code pushed
- Render account (sign up at [render.com](https://render.com) - free tier available)

## Overview

Render will provide:
- ✅ PostgreSQL database (free tier: 90 days, then $7/month)
- ✅ Web service for your API (free tier available)
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deploy on git push

## Step-by-Step Deployment

### Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Render to access your repositories

### Step 2: Create PostgreSQL Database

1. From Render Dashboard, click **New +** → **PostgreSQL**
2. Configure:
   - **Name:** `image-processing-db`
   - **Database:** `imagedb` (or any name)
   - **User:** `imageuser` (will be auto-created)
   - **Region:** Choose closest to you
   - **Plan:** `Free` (or choose paid for production)
3. Click **Create Database**
4. Wait 1-2 minutes for database to be ready
5. **Important:** Copy the **Internal Database URL** (it starts with `postgresql://`)
   - Find it under "Connections" → "Internal Database URL"
   - Example: `postgresql://imageuser:password@host/imagedb`

### Step 3: Create Web Service

1. Click **New +** → **Web Service**
2. Connect your repository:
   - Select **Build and deploy from a Git repository**
   - Click **Connect** next to your `image_processing_service` repository
3. Configure the service:

   **Name:** `image-processing-api` (or your preferred name)
   
   **Region:** Same as your database
   
   **Branch:** `main`
   
   **Root Directory:** `backend`
   
   **Runtime:** `Python 3`
   
   **Build Command:**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Start Command:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
   
   **Plan:** `Free` (or choose paid)

4. Click **Advanced** to add environment variables

### Step 4: Add Environment Variables

Click **Add Environment Variable** for each:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | Paste the Internal Database URL from Step 2 | Must start with `postgresql://` |
| `SECRET_KEY` | Click "Generate" or use: `your-super-secret-key-change-in-production-12345` | Keep this secret! |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | Token expiry time |
| `STORAGE_BACKEND` | `local` | Storage type |
| `UPLOAD_DIR` | `uploads` | Upload directory |

**Important:** Make sure `DATABASE_URL` uses the **Internal Database URL** from your Render PostgreSQL database.

### Step 5: Deploy

1. Click **Create Web Service**
2. Wait 3-5 minutes for the build and deployment
3. Watch the logs for any errors
4. Once deployed, you'll see "Your service is live 🎉"

### Step 6: Get Your API URL

1. At the top of your service page, you'll see your URL:
   ```
   https://image-processing-api.onrender.com
   ```
2. **Copy this URL** - you'll need it for the frontend!

### Step 7: Test Your API

Visit your API documentation:
```
https://your-service.onrender.com/docs
```

You should see the FastAPI Swagger UI.

### Step 8: Update Frontend with Backend URL

Now update your Vercel frontend:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open your frontend project
3. Go to **Settings** → **Environment Variables**
4. Edit `NEXT_PUBLIC_API_URL`:
   - Change from: `http://localhost:8000`
   - Change to: `https://your-service.onrender.com` (your Render URL)
5. Go to **Deployments** → Redeploy the latest deployment

### Step 9: Update CORS in Backend

Your backend needs to allow requests from your Vercel frontend:

Update `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend.vercel.app"  # Add your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push changes - Render will auto-deploy!

## Post-Deployment Checklist

- [ ] API is accessible at your Render URL
- [ ] Can see API docs at `/docs`
- [ ] Database is connected (no connection errors in logs)
- [ ] Frontend environment variable updated with Render URL
- [ ] CORS allows frontend domain
- [ ] Can register a new user
- [ ] Can login
- [ ] Can upload images

## Common Issues & Solutions

### Build Fails: "Could not find a version that satisfies..."

**Solution:** Check `requirements.txt` - make sure all packages have versions specified.

### Database Connection Error

**Solution:** 
1. Verify `DATABASE_URL` is set correctly
2. Use the **Internal Database URL**, not External
3. Ensure database is in the same region as web service

### CORS Error in Frontend

**Solution:**
1. Add your Vercel URL to CORS origins in `backend/app/main.py`
2. Commit and push to trigger redeploy
3. Clear browser cache

### 404 on All Routes

**Solution:** Check your start command uses `app.main:app` (not just `main:app`)

### Free Tier Limitations

**Important Notes:**
- Free web services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Upgrade to paid plan for always-on service

## Monitoring & Logs

Access logs in Render:
1. Go to your service dashboard
2. Click **Logs** tab
3. View real-time logs

## Environment Variables Reference

```bash
# Required
DATABASE_URL=postgresql://user:password@host:5432/database
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
STORAGE_BACKEND=local
UPLOAD_DIR=uploads
```

## Updating Your Deployment

Render auto-deploys when you push to GitHub:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render will automatically rebuild and redeploy (takes 2-3 minutes).

## Custom Domain (Optional)

Add your own domain:
1. Go to service **Settings** → **Custom Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. SSL certificate auto-provisioned

## Cost

**Free Tier Includes:**
- 750 hours/month web service
- PostgreSQL database (90 days free trial, then $7/month)
- Automatic SSL
- Auto-deploy from GitHub

## Support

- [Render Documentation](https://render.com/docs)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- Check main [README.md](../README.md)

---

**Your backend is now deployed and connected to your frontend!** 🚀
