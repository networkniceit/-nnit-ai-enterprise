@echo off
REM NNIT AI Enterprise - Setup Script (Windows)
REM Author: Solomon Omomeje Ayodele
REM Company: Network Nice IT Tec (NNIT)

echo =========================================
echo NNIT AI Enterprise - Setup
echo =========================================
echo.

echo Checking prerequisites...
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    exit /b 1
)
echo [OK] Node.js found

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    exit /b 1
)
echo [OK] npm found

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed. Please install Python 3.11+ from https://python.org/
    exit /b 1
)
echo [OK] Python found

where pip >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] pip is not installed
    exit /b 1
)
echo [OK] pip found

where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Docker found
) else (
    echo [INFO] Docker not found (optional)
)

echo.
echo =========================================
echo Setting up environment files...
echo =========================================
echo.

if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo [OK] Created backend\.env
) else (
    echo [INFO] backend\.env already exists
)

if not exist frontend\.env (
    copy frontend\.env.example frontend\.env
    echo [OK] Created frontend\.env
) else (
    echo [INFO] frontend\.env already exists
)

if not exist mobile\.env (
    copy mobile\.env.example mobile\.env
    echo [OK] Created mobile\.env
) else (
    echo [INFO] mobile\.env already exists
)

echo.
echo =========================================
echo Installing backend dependencies...
echo =========================================
echo.

cd backend
pip install -r requirements.txt
if %ERRORLEVEL% EQU 0 (
    echo [OK] Backend dependencies installed
) else (
    echo [ERROR] Failed to install backend dependencies
    cd ..
    exit /b 1
)
cd ..

echo.
echo =========================================
echo Installing frontend dependencies...
echo =========================================
echo.

cd frontend
call npm install
if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend dependencies installed
) else (
    echo [ERROR] Failed to install frontend dependencies
    cd ..
    exit /b 1
)
cd ..

echo.
echo =========================================
echo Installing mobile dependencies...
echo =========================================
echo.

cd mobile
call npm install
if %ERRORLEVEL% EQU 0 (
    echo [OK] Mobile dependencies installed
) else (
    echo [ERROR] Failed to install mobile dependencies
    cd ..
    exit /b 1
)
cd ..

echo.
echo =========================================
echo Setup Complete!
echo =========================================
echo.

echo [OK] NNIT AI Enterprise is ready!
echo.
echo Next steps:
echo.
echo 1. Configure your environment variables:
echo    - Edit backend\.env with your API keys
echo    - Edit frontend\.env with your Supabase credentials
echo    - Edit mobile\.env with your configuration
echo.
echo 2. Start the services:
echo.
echo    Using Docker:
echo    $ docker-compose up -d
echo.
echo    Or manually:
echo.
echo    Terminal 1 (Backend):
echo    $ cd backend ^&^& python -m uvicorn main:app --reload --port 8000
echo.
echo    Terminal 2 (Frontend):
echo    $ cd frontend ^&^& npm run dev
echo.
echo    Terminal 3 (Mobile):
echo    $ cd mobile ^&^& npx expo start
echo.
echo 3. Access the application:
echo    - Web: http://localhost:3000
echo    - API Docs: http://localhost:8000/docs
echo    - Mobile: Scan QR code with Expo Go
echo.
echo =========================================
echo Created by Solomon Omomeje Ayodele
echo Network Nice IT Tec (NNIT)
echo =========================================

pause
