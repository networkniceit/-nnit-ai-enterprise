# Architecture Documentation

## System Architecture

NNIT AI Enterprise is built as a modern three-tier web application with the following architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   React + TypeScript (Vite)                         │   │
│  │   - React Router (Navigation)                       │   │
│  │   - Zustand (State Management)                      │   │
│  │   - TanStack Query (Data Fetching)                  │   │
│  │   - Socket.IO Client (Real-time)                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │ WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Express.js + TypeScript                           │   │
│  │   - Authentication Middleware (JWT)                 │   │
│  │   - API Routes & Controllers                        │   │
│  │   - Business Logic Services                         │   │
│  │   - AI Matching Service                             │   │
│  │   - Socket.IO Server                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQL Queries
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌────────────────────────┐  ┌──────────────────────────┐   │
│  │   PostgreSQL 15        │  │      Redis 7             │   │
│  │   - Users              │  │   - Session Cache        │   │
│  │   - Jobs               │  │   - Real-time Data       │   │
│  │   - Proposals          │  │                          │   │
│  │   - Messages           │  │                          │   │
│  └────────────────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Backend Components

#### 1. Server (`server.ts`)
- Express application initialization
- Middleware configuration
- Route registration
- Socket.IO setup
- Database connection management

#### 2. Models
- **User**: User accounts with authentication
- **Job**: Job postings from clients
- **Proposal**: Freelancer applications to jobs
- **Message**: Direct messaging between users

#### 3. Controllers
Handle HTTP requests and responses:
- `auth.controller.ts`: Registration and login
- `user.controller.ts`: User profile management
- `job.controller.ts`: Job CRUD operations
- `proposal.controller.ts`: Proposal management
- `message.controller.ts`: Messaging functionality

#### 4. Services
Business logic and AI features:
- `ai.service.ts`: Job matching algorithms

#### 5. Middleware
- `auth.ts`: JWT authentication and authorization

### Frontend Components

#### 1. Pages
- **Login/Register**: User authentication
- **Dashboard**: Overview and navigation
- **Jobs**: Browse and search jobs
- **JobDetails**: View job information
- **CreateJob**: Post new jobs (clients)
- **Proposals**: Manage proposals (freelancers)
- **Profile**: User profile management
- **Messages**: Real-time messaging

#### 2. Services
- `api.ts`: Axios-based API client with interceptors

#### 3. State Management
- **Zustand Store**: Global authentication state with persistence

## Data Flow

### User Registration Flow
```
User → Frontend Form → API Request → Validation
  → Password Hashing → DB Insert → JWT Generation
  → Response with Token → Store Token → Redirect to Dashboard
```

### Job Creation Flow (Client)
```
Client → Create Job Form → API Request → Auth Middleware
  → Validation → DB Insert → AI Matching Service
  → Get Recommendations → Response with Job & Matches
  → Display Success
```

### Proposal Submission Flow (Freelancer)
```
Freelancer → Job Details → Submit Proposal Form
  → API Request → Auth Middleware → Validation
  → Check Duplicates → DB Insert → Notify Client
  → Response → Display Success
```

### Real-time Messaging Flow
```
User A → Send Message → Socket.IO → Server
  → DB Insert → Emit to Room → Socket.IO → User B
  → Display Message
```

## AI Matching Algorithm

### Job-to-Freelancer Matching
```typescript
score = (skill_match * 0.5) + (rating * 0.3) + (experience * 0.2)

where:
  skill_match = (matching_skills / required_skills) * 100
  rating = (user_rating / 5) * 100
  experience = min((completed_jobs * 2), 100)
```

### Recommendation Threshold
- Score ≥ 70%: Recommended
- Score < 70%: Not recommended (but still shown)

## Security Measures

1. **Authentication**
   - JWT tokens with configurable expiration
   - Bcrypt password hashing (10 rounds)
   - Token validation on protected routes

2. **Authorization**
   - Role-based access control
   - Resource ownership verification
   - Middleware guards on sensitive operations

3. **API Security**
   - Helmet.js for HTTP headers
   - CORS configuration
   - Request validation with express-validator
   - SQL injection protection (Sequelize ORM)

4. **Data Protection**
   - Password fields excluded from API responses
   - Environment variables for secrets
   - HTTPS in production

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role ENUM('client', 'freelancer', 'admin') NOT NULL,
  profile_picture VARCHAR(255),
  bio TEXT,
  skills TEXT[],
  hourly_rate DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  skills TEXT[] NOT NULL,
  status ENUM('open', 'in_progress', 'completed', 'cancelled'),
  client_id INTEGER REFERENCES users(id),
  freelancer_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Proposals Table
```sql
CREATE TABLE proposals (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  freelancer_id INTEGER REFERENCES users(id),
  cover_letter TEXT NOT NULL,
  proposed_budget DECIMAL(10,2) NOT NULL,
  estimated_duration VARCHAR(255) NOT NULL,
  status ENUM('pending', 'accepted', 'rejected'),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  job_id INTEGER REFERENCES jobs(id),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Deployment Architecture

### Docker Compose Setup
```yaml
services:
  - postgres: Database
  - redis: Caching and session storage
  - backend: Node.js API server
  - frontend: React application (dev server)
```

### Production Considerations
1. Use environment-specific configurations
2. Enable HTTPS with SSL certificates
3. Set up database backups
4. Configure logging and monitoring
5. Use process managers (PM2)
6. Implement rate limiting
7. Set up CDN for static assets
8. Use production build of React

## Scaling Considerations

### Horizontal Scaling
- Load balancer for multiple backend instances
- Redis for session sharing
- PostgreSQL read replicas

### Vertical Scaling
- Database connection pooling
- Redis caching for frequent queries
- CDN for static assets
- Code splitting in frontend

### Performance Optimization
- Database indexing on frequent queries
- API response caching
- Lazy loading in frontend
- Image optimization
- Compression middleware

## Future Enhancements

1. **Advanced AI**
   - Machine learning models for better matching
   - Natural language processing for job descriptions
   - Sentiment analysis on reviews

2. **Features**
   - Video conferencing
   - Contract management
   - Escrow payment system
   - Advanced analytics

3. **Infrastructure**
   - Microservices architecture
   - GraphQL API
   - Event-driven architecture
   - Kubernetes orchestration
