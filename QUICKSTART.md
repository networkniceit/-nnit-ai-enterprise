# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Docker (Recommended - Easiest)

1. **Prerequisites**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Clone and Start**:
```bash
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
docker-compose up -d
```

3. **Access the Platform**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

4. **Create Your Account**:
   - Click "Register" on the login page
   - Choose "Freelancer" or "Client" role
   - Start using the platform!

### Option 2: Manual Setup

1. **Prerequisites**:
   - Node.js 18+
   - PostgreSQL 15+
   - Redis 7+

2. **Setup Environment**:
```bash
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
cp .env.example .env
# Edit .env with your database credentials
```

3. **Install Dependencies**:
```bash
npm run install:all
```

4. **Start Services** (in separate terminals):

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

5. **Access the Platform**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📚 First Steps

### As a Freelancer:
1. Register with "Freelancer" role
2. Complete your profile (add skills, hourly rate)
3. Browse available jobs
4. Submit proposals to interesting jobs
5. Communicate with clients via messages

### As a Client:
1. Register with "Client" role
2. Post your first job (title, description, budget, skills)
3. Get AI-powered freelancer recommendations
4. Review proposals from freelancers
5. Accept a proposal and start working
6. Mark jobs as completed

## 🔑 Key Features

- **Smart Matching**: AI automatically matches freelancers to your jobs based on skills and experience
- **Real-time Chat**: Built-in messaging system for instant communication
- **Secure**: JWT authentication with encrypted passwords
- **Free & Open Source**: 100% free to use and modify

## 🧪 Testing the Platform

### Test User Creation
```bash
# Register as a freelancer
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "freelancer@test.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "freelancer"
  }'

# Register as a client
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@test.com",
    "password": "password123",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "client"
  }'
```

### Health Check
```bash
curl http://localhost:3000/health
```

## 🛠️ Development Commands

```bash
# Install all dependencies
npm run install:all

# Start both backend and frontend (requires concurrently)
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## 📖 API Documentation

See the main [README.md](README.md) for complete API endpoint documentation.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (port 3000)
lsof -ti:3000 | xargs kill -9

# Frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

### Database Connection Issues
- Ensure PostgreSQL is running on port 5432
- Check credentials in `.env` file
- Try connecting with: `psql -U nnit -d nnit_freelancer`

### Docker Issues
```bash
# Stop all containers
docker-compose down

# Remove volumes and restart
docker-compose down -v
docker-compose up -d

# View logs
docker-compose logs -f
```

## 💡 Next Steps

1. Read the [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system design
2. Check out the [API documentation](README.md#api-endpoints)
3. Explore the codebase and customize it for your needs
4. Star the repository if you find it useful!

## 🤝 Need Help?

- Open an issue on GitHub
- Check the documentation
- Review the code examples in the repository

## 🎉 You're Ready!

The platform is now running. Open http://localhost:5173 in your browser and start building your freelancer marketplace!
