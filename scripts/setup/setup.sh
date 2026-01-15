#!/bin/bash

# NNIT AI Enterprise - Setup Script (Linux/Mac)
# Author: Solomon Omomeje Ayodele
# Company: Network Nice IT Tec (NNIT)

set -e

echo "========================================="
echo "NNIT AI Enterprise - Setup"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."
echo ""

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi
print_success "Node.js $(node --version) found"

if ! command_exists npm; then
    print_error "npm is not installed. Please install npm"
    exit 1
fi
print_success "npm $(npm --version) found"

if ! command_exists python3; then
    print_error "Python 3 is not installed. Please install Python 3.11+ from https://python.org/"
    exit 1
fi
print_success "Python $(python3 --version) found"

if ! command_exists pip3; then
    print_error "pip3 is not installed. Please install pip"
    exit 1
fi
print_success "pip3 found"

if command_exists docker; then
    print_success "Docker $(docker --version) found"
    DOCKER_AVAILABLE=true
else
    print_info "Docker not found (optional)"
    DOCKER_AVAILABLE=false
fi

echo ""
echo "========================================="
echo "Setting up environment files..."
echo "========================================="
echo ""

# Copy environment files
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    print_success "Created backend/.env"
else
    print_info "backend/.env already exists"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    print_success "Created frontend/.env"
else
    print_info "frontend/.env already exists"
fi

if [ ! -f mobile/.env ]; then
    cp mobile/.env.example mobile/.env
    print_success "Created mobile/.env"
else
    print_info "mobile/.env already exists"
fi

echo ""
echo "========================================="
echo "Installing backend dependencies..."
echo "========================================="
echo ""

cd backend
if command_exists python3; then
    python3 -m pip install -r requirements.txt --quiet
    print_success "Backend dependencies installed"
fi
cd ..

echo ""
echo "========================================="
echo "Installing frontend dependencies..."
echo "========================================="
echo ""

cd frontend
npm install --silent
print_success "Frontend dependencies installed"
cd ..

echo ""
echo "========================================="
echo "Installing mobile dependencies..."
echo "========================================="
echo ""

cd mobile
npm install --silent
print_success "Mobile dependencies installed"
cd ..

echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""

print_success "NNIT AI Enterprise is ready!"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure your environment variables:"
echo "   - Edit backend/.env with your API keys"
echo "   - Edit frontend/.env with your Supabase credentials"
echo "   - Edit mobile/.env with your configuration"
echo ""
echo "2. Start the services:"
echo ""
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "   Using Docker:"
    echo "   $ docker-compose up -d"
    echo ""
fi
echo "   Or manually:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd backend && uvicorn main:app --reload --port 8000"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ cd frontend && npm run dev"
echo ""
echo "   Terminal 3 (Mobile):"
echo "   $ cd mobile && npx expo start"
echo ""
echo "3. Access the application:"
echo "   - Web: http://localhost:3000"
echo "   - API Docs: http://localhost:8000/docs"
echo "   - Mobile: Scan QR code with Expo Go"
echo ""
echo "========================================="
echo "Created by Solomon Omomeje Ayodele"
echo "Network Nice IT Tec (NNIT)"
echo "========================================="
