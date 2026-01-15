# Free Services Setup Guide

This guide explains how to get API keys and setup all free services used in NNIT AI Enterprise.

## Overview

All services used in this platform have FREE tiers that are sufficient for development and small-scale production use.

## 1. Supabase (Database, Auth, Storage)

**Cost:** FREE tier (500MB database, 1GB file storage, 50,000 monthly active users)

### Setup Steps:

1. Visit [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create an account (GitHub auth recommended)
4. Create a new project:
   - Choose a name: `nnit-ai-enterprise`
   - Set a strong database password
   - Select a region close to you
5. Wait for project setup (2-3 minutes)
6. Get your credentials:
   - Go to **Settings** → **API**
   - Copy `Project URL` → This is your `SUPABASE_URL`
   - Copy `anon public` key → This is your `SUPABASE_ANON_KEY`
   - Copy `service_role secret` → This is your `SUPABASE_SERVICE_KEY` (keep secret!)

### Database Setup:

1. Go to **SQL Editor**
2. Click **New Query**
3. Copy contents from `database/schemas/schema.sql`
4. Paste and click **Run**

### Storage Setup:

1. Go to **Storage**
2. Create buckets as per `database/storage-buckets.md`:
   - `uploads` (private)
   - `generated` (private)
   - `portfolios` (public)
3. Apply RLS policies from the storage buckets doc

## 2. Groq (LLM for Text & Code AI)

**Cost:** FREE tier (14,400 requests/day, 300 requests/minute)

### Setup Steps:

1. Visit [https://console.groq.com](https://console.groq.com)
2. Click "Sign In" (use Google or GitHub)
3. Go to **API Keys** section
4. Click **Create API Key**
5. Name it: `NNIT-AI-Enterprise`
6. Copy the key → This is your `GROQ_API_KEY`
7. **Important:** Save it immediately (won't be shown again)

### Models Available (Free):

- `llama-3.1-70b-versatile` - Best for general tasks (default)
- `llama-3.1-8b-instant` - Faster, good for simple tasks
- `mixtral-8x7b-32768` - Good for long context

## 3. Hugging Face (Image & Audio AI)

**Cost:** FREE tier (1,000 API calls/day)

### Setup Steps:

1. Visit [https://huggingface.co](https://huggingface.co)
2. Click "Sign Up" (use email or GitHub)
3. Go to your profile → **Settings**
4. Click **Access Tokens**
5. Click **New token**
6. Name: `nnit-ai-enterprise`
7. Role: Select **read**
8. Click **Generate**
9. Copy the token → This is your `HUGGINGFACE_API_KEY`

### Models Used (All Free):

- **Images:** `stabilityai/stable-diffusion-2-1`
- **TTS:** `facebook/fastspeech2-en-ljspeech`
- **STT:** `openai/whisper-base`

**Note:** First request to a model may be slow (model loading). Subsequent requests are faster.

## 4. FFmpeg (Video Processing)

**Cost:** FREE (open-source)

### Installation:

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
1. Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to PATH

**Verify Installation:**
```bash
ffmpeg -version
```

## 5. Vercel (Frontend Hosting)

**Cost:** FREE tier (100GB bandwidth/month, unlimited deployments)

### Setup Steps:

1. Visit [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import the GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_BASE_URL`
6. Click **Deploy**

## 6. Render (Backend Hosting)

**Cost:** FREE tier (750 hours/month, spins down after 15 min inactivity)

### Setup Steps:

1. Visit [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click **New** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - Name: `nnit-backend`
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `GROQ_API_KEY`
   - `HUGGINGFACE_API_KEY`
   - `SECRET_KEY` (generate random string)
7. Click **Create Web Service**

**Note:** Free tier sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

## 7. EAS Build (Mobile App Builds)

**Cost:** FREE tier (30 builds/month for iOS + Android)

### Setup Steps:

1. Install Expo CLI:
```bash
npm install -g expo-cli eas-cli
```

2. Create Expo account:
```bash
expo register
```

3. Login:
```bash
eas login
```

4. Initialize EAS:
```bash
cd mobile
eas build:configure
```

5. Build APK (Android):
```bash
eas build --profile preview --platform android
```

## Environment Configuration

After getting all keys, update your `.env` files:

### backend/.env
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... # Keep secret!
GROQ_API_KEY=gsk_...
HUGGINGFACE_API_KEY=hf_...
SECRET_KEY=your-random-secret-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/nnit_enterprise
```

### frontend/.env
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_API_BASE_URL=http://localhost:8000
```

### mobile/.env
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
EXPO_PUBLIC_API_URL=http://localhost:8000
```

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** (every 3-6 months)
4. **Keep service_role key secret** - it bypasses RLS
5. **Use environment variables** in production deployments
6. **Enable rate limiting** on all APIs

## Rate Limits Summary

| Service | Free Tier Limit |
|---------|----------------|
| Groq | 14,400 requests/day |
| Hugging Face | 1,000 requests/day |
| Supabase | 500MB DB, 50K MAU |
| Vercel | 100GB bandwidth/month |
| Render | 750 hours/month |
| EAS Build | 30 builds/month |

## Monitoring Usage

- **Groq:** Dashboard at https://console.groq.com
- **Hugging Face:** Check usage in account settings
- **Supabase:** Project dashboard shows usage metrics
- **Vercel:** Analytics tab in project
- **Render:** Dashboard shows usage and logs

## Upgrade Paths

When you outgrow free tiers:

- **Groq:** Pay-as-you-go starting at $0.27/million tokens
- **Hugging Face:** Pro ($9/month) for higher limits
- **Supabase:** Pro ($25/month) for 8GB database
- **Vercel:** Pro ($20/month) for 1TB bandwidth
- **Render:** Starter ($7/month) for always-on service

## Support

For service-specific issues:
- Supabase: https://supabase.com/docs
- Groq: https://console.groq.com/docs
- Hugging Face: https://huggingface.co/docs
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs

---

**Created by Solomon Omomeje Ayodele | Network Nice IT Tec (NNIT)**
