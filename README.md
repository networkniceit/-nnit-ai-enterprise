# NNIT AI Enterprise - AI-Powered Freelancer Platform

A comprehensive, 100% free AI-powered freelancer platform built with modern technologies.

## Features

### Core Features
- 🔐 **User Authentication** - Secure JWT-based authentication
- 👥 **User Roles** - Support for Clients, Freelancers, and Admins
- 💼 **Job Management** - Post, browse, and manage job listings
- 📝 **Proposal System** - Freelancers can submit proposals to jobs
- 💬 **Real-time Messaging** - Built-in chat system with Socket.IO
- 🤖 **AI-Powered Matching** - Intelligent job-freelancer matching algorithm
- ⭐ **Rating System** - Rate and review freelancers
- 🔍 **Advanced Search** - Filter jobs by skills, budget, duration

### AI Features
- Smart job-freelancer matching based on skills
- Intelligent job recommendations for freelancers
- Skill-based ranking and scoring
- Automated proposal evaluation

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Cache**: Redis
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.IO
- **Validation**: express-validator

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **API Client**: Axios
- **Data Fetching**: TanStack Query (React Query)

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15
- **Cache**: Redis 7

## Project Structure

```
├── backend/               # Backend API server
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic & AI services
│   │   └── server.ts     # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── store/        # State management
│   │   └── App.tsx       # Main app component
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml    # Docker configuration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (or use Docker)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start with Docker (Recommended)**
```bash
docker-compose up -d
```

Or manually:

5. **Start PostgreSQL and Redis** (if not using Docker)
```bash
# Start PostgreSQL on port 5432
# Start Redis on port 6379
```

6. **Start the backend**
```bash
cd backend
npm install
npm run dev
```

7. **Start the frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

8. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id` - Get user by ID
- `GET /api/users` - List users

### Jobs
- `POST /api/jobs` - Create job (Client only)
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/complete` - Mark job as completed

### Proposals
- `POST /api/proposals` - Submit proposal
- `GET /api/proposals/job/:jobId` - Get proposals for a job
- `GET /api/proposals/freelancer/:id` - Get freelancer's proposals
- `PUT /api/proposals/:id/accept` - Accept proposal
- `PUT /api/proposals/:id/reject` - Reject proposal

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/conversation/:userId` - Get conversation with user
- `PUT /api/messages/:id/read` - Mark message as read

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Build everything
npm run build

# Or individually
cd backend && npm run build
cd frontend && npm run build
```

### Linting
```bash
# Backend
cd backend && npm run lint

# Frontend
cd frontend && npm run lint
```

## Database Schema

### Users
- Authentication and profile information
- Skills array for freelancers
- Ratings and completed jobs tracking

### Jobs
- Job postings with requirements
- Status tracking (open, in_progress, completed, cancelled)
- Client and freelancer associations

### Proposals
- Freelancer applications to jobs
- Status tracking (pending, accepted, rejected)
- Budget and timeline information

### Messages
- Direct messaging between users
- Job-related conversations
- Read/unread status

## AI Matching Algorithm

The platform uses a weighted scoring algorithm to match freelancers with jobs:

- **Skill Match (50%)**: Percentage of job skills the freelancer possesses
- **Rating (30%)**: Freelancer's average rating
- **Experience (20%)**: Number of completed jobs

Freelancers with a match score of 70% or higher are marked as "recommended."

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@nnit-ai-enterprise.com or open an issue on GitHub.

## Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced AI recommendations using ML models
- [ ] Mobile applications (React Native)
- [ ] Video call integration
- [ ] File sharing and portfolio management
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] OAuth integration (Google, GitHub)

## Acknowledgments

- Built with modern web technologies
- Inspired by leading freelancer platforms
- Community-driven and open source
