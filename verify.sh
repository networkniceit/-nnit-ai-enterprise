#!/bin/bash

echo "🔍 NNIT AI Enterprise Platform Verification Script"
echo "=================================================="
echo ""

# Check if all directories exist
echo "📁 Checking directory structure..."
directories=(
  "backend/src/models"
  "backend/src/controllers"
  "backend/src/routes"
  "backend/src/services"
  "backend/src/middleware"
  "backend/src/config"
  "frontend/src/pages"
  "frontend/src/services"
  "frontend/src/store"
)

for dir in "${directories[@]}"; do
  if [ -d "$dir" ]; then
    echo "  ✅ $dir exists"
  else
    echo "  ❌ $dir missing"
  fi
done

echo ""
echo "📄 Checking critical files..."
files=(
  "backend/package.json"
  "backend/tsconfig.json"
  "backend/src/server.ts"
  "backend/Dockerfile"
  "frontend/package.json"
  "frontend/tsconfig.json"
  "frontend/src/App.tsx"
  "frontend/Dockerfile"
  "docker-compose.yml"
  ".env.example"
  "README.md"
  "ARCHITECTURE.md"
  ".github/workflows/ci.yml"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file exists"
  else
    echo "  ❌ $file missing"
  fi
done

echo ""
echo "🔢 Counting files by type..."
echo "  TypeScript backend files: $(find backend/src -name "*.ts" 2>/dev/null | wc -l)"
echo "  TypeScript frontend files: $(find frontend/src -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)"
echo "  Total configuration files: $(find . -maxdepth 2 -name "*.json" -o -name "*.yml" | wc -l)"

echo ""
echo "📊 Project Statistics:"
echo "  Backend Models: $(find backend/src/models -name "*.ts" 2>/dev/null | wc -l)"
echo "  Backend Controllers: $(find backend/src/controllers -name "*.ts" 2>/dev/null | wc -l)"
echo "  Backend Routes: $(find backend/src/routes -name "*.ts" 2>/dev/null | wc -l)"
echo "  Frontend Pages: $(find frontend/src/pages -name "*.tsx" 2>/dev/null | wc -l)"

echo ""
echo "✅ Verification Complete!"
echo ""
echo "🚀 To start the platform:"
echo "   1. Using Docker: docker-compose up -d"
echo "   2. Manual: npm run install:all && npm run dev"
echo ""
