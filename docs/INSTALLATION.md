# Installation Guide

Complete installation guide for NNIT AI Enterprise platform.

## Prerequisites

### Required Software

- **Node.js** 18+ and npm ([Download](https://nodejs.org/))
- **Python** 3.11+ and pip ([Download](https://python.org/))
- **Git** ([Download](https://git-scm.com/))

### Optional Software

- **Docker** and Docker Compose ([Download](https://docker.com/))
- **Expo Go** mobile app for testing (iOS/Android)

## Quick Start (Automated)

### Linux / macOS

```bash
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
chmod +x scripts/setup/setup.sh
./scripts/setup/setup.sh
```

### Windows (Command Prompt)

```cmd
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
scripts\setup\setup.bat
```

### Windows (PowerShell)

```powershell
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
.\scripts\setup\setup.ps1
```

## Manual Installation

### 1. Clone Repository

```bash
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
```

### 2. Setup Environment Variables

Copy environment example files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp mobile/.env.example mobile/.env
```

Edit each `.env` file with your configuration. See [Free Services Setup](FREE_SERVICES_SETUP.md) for getting API keys.

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 5. Install Mobile Dependencies

```bash
cd mobile
npm install
cd ..
```

### 6. Setup Database (Optional for Local Development)

If using Docker:

```bash
docker-compose up -d postgres
```

Then run the schema:

```bash
psql -h localhost -U postgres -d nnit_enterprise -f database/schemas/schema.sql
```

## Running the Application

### Using Docker (Recommended)

Start all services:

```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

Stop services:

```bash
docker-compose down
```

### Manual Start (Development)

Open 3 terminals:

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Mobile (Optional):**
```bash
cd mobile
npx expo start
```

## Verification

### Backend

Visit http://localhost:8000/docs - You should see the Swagger API documentation.

### Frontend

Visit http://localhost:3000 - You should see the NNIT AI Enterprise landing page.

### Mobile

Scan the QR code from `npx expo start` with Expo Go app on your device.

## Troubleshooting

### Port Already in Use

If ports 3000 or 8000 are in use:

**Frontend:**
```bash
cd frontend
npm run dev -- --port 3001
```

**Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8001
```

### Python Module Not Found

Ensure you're using Python 3.11+:
```bash
python --version
python3 --version
```

Reinstall dependencies:
```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

### Node Module Errors

Clear cache and reinstall:

```bash
cd frontend  # or mobile
rm -rf node_modules package-lock.json
npm install
```

### FFmpeg Not Found

Install FFmpeg for video processing:

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

### Database Connection Issues

Check PostgreSQL is running:
```bash
docker-compose ps
```

Or if using Supabase, verify your `SUPABASE_URL` and `SUPABASE_KEY` in `.env`.

## Next Steps

- [Configure Free Services](FREE_SERVICES_SETUP.md)
- [API Reference](API_REFERENCE.md)
- [Deployment Guide](DEPLOYMENT.md)

## Support

For issues, please visit:
- GitHub Issues: https://github.com/networkniceit/-nnit-ai-enterprise/issues
- Documentation: https://github.com/networkniceit/-nnit-ai-enterprise/tree/main/docs

---

**Created by Solomon Omomeje Ayodele | Network Nice IT Tec (NNIT)**
