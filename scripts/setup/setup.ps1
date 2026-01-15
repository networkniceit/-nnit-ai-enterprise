# NNIT AI Enterprise - Setup Script (PowerShell)
# Author: Solomon Omomeje Ayodele
# Company: Network Nice IT Tec (NNIT)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "NNIT AI Enterprise - Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if command exists
function Test-CommandExists {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-CommandExists "node")) {
    Write-Host "[ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Node.js found" -ForegroundColor Green

if (-not (Test-CommandExists "npm")) {
    Write-Host "[ERROR] npm is not installed" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] npm found" -ForegroundColor Green

if (-not (Test-CommandExists "python")) {
    Write-Host "[ERROR] Python is not installed. Please install Python 3.11+ from https://python.org/" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Python found" -ForegroundColor Green

if (-not (Test-CommandExists "pip")) {
    Write-Host "[ERROR] pip is not installed" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] pip found" -ForegroundColor Green

if (Test-CommandExists "docker") {
    Write-Host "[OK] Docker found" -ForegroundColor Green
} else {
    Write-Host "[INFO] Docker not found (optional)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Setting up environment files..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Copy environment files
if (-not (Test-Path "backend\.env")) {
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "[OK] Created backend\.env" -ForegroundColor Green
} else {
    Write-Host "[INFO] backend\.env already exists" -ForegroundColor Yellow
}

if (-not (Test-Path "frontend\.env")) {
    Copy-Item "frontend\.env.example" "frontend\.env"
    Write-Host "[OK] Created frontend\.env" -ForegroundColor Green
} else {
    Write-Host "[INFO] frontend\.env already exists" -ForegroundColor Yellow
}

if (-not (Test-Path "mobile\.env")) {
    Copy-Item "mobile\.env.example" "mobile\.env"
    Write-Host "[OK] Created mobile\.env" -ForegroundColor Green
} else {
    Write-Host "[INFO] mobile\.env already exists" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend
pip install -r requirements.txt
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to install backend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Installing mobile dependencies..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location mobile
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Mobile dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to install mobile dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[OK] NNIT AI Enterprise is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host ""
Write-Host "1. Configure your environment variables:"
Write-Host "   - Edit backend\.env with your API keys"
Write-Host "   - Edit frontend\.env with your Supabase credentials"
Write-Host "   - Edit mobile\.env with your configuration"
Write-Host ""
Write-Host "2. Start the services:"
Write-Host ""
Write-Host "   Using Docker:"
Write-Host "   docker-compose up -d"
Write-Host ""
Write-Host "   Or manually:"
Write-Host ""
Write-Host "   Terminal 1 (Backend):"
Write-Host "   cd backend; python -m uvicorn main:app --reload --port 8000"
Write-Host ""
Write-Host "   Terminal 2 (Frontend):"
Write-Host "   cd frontend; npm run dev"
Write-Host ""
Write-Host "   Terminal 3 (Mobile):"
Write-Host "   cd mobile; npx expo start"
Write-Host ""
Write-Host "3. Access the application:"
Write-Host "   - Web: http://localhost:3000"
Write-Host "   - API Docs: http://localhost:8000/docs"
Write-Host "   - Mobile: Scan QR code with Expo Go"
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Created by Solomon Omomeje Ayodele" -ForegroundColor Cyan
Write-Host "Network Nice IT Tec (NNIT)" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

Read-Host -Prompt "Press Enter to exit"
