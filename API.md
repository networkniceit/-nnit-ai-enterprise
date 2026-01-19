# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "both" // "freelancer", "client", or "both"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "both",
    "avatar": "https://via.placeholder.com/150"
  }
}
```

### Login User
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "both",
    "avatar": "https://via.placeholder.com/150"
  }
}
```

### Get Current User
**GET** `/auth/me`

Get authenticated user details.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "both"
  }
}
```

---

## Project Endpoints

### Get All Projects
**GET** `/projects`

Get all available projects with optional filters.

**Query Parameters:**
- `category` - Filter by category (e.g., "web-development")
- `status` - Filter by status (e.g., "open")
- `search` - Search in title and description

**Response:**
```json
{
  "success": true,
  "count": 1,
  "projects": [
    {
      "id": "123456789",
      "title": "Build E-commerce Website",
      "description": "Looking for a developer...",
      "category": "web-development",
      "budget": {
        "min": 2000,
        "max": 5000
      },
      "duration": "1-3-months",
      "requiredSkills": ["React", "Node.js"],
      "status": "open",
      "client": {
        "id": "987654321",
        "name": "Client Name",
        "email": "client@example.com"
      },
      "createdAt": "2026-01-19T12:00:00.000Z"
    }
  ]
}
```

### Create Project
**POST** `/projects`

Create a new project (requires authentication).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Build E-commerce Website",
  "description": "Looking for a developer to build a modern e-commerce platform",
  "category": "web-development",
  "budget": {
    "min": 2000,
    "max": 5000
  },
  "duration": "1-3-months",
  "requiredSkills": ["React", "Node.js", "MongoDB"]
}
```

**Response:**
```json
{
  "success": true,
  "project": {
    "id": "123456789",
    "title": "Build E-commerce Website",
    ...
  }
}
```

### Get Single Project
**GET** `/projects/:id`

Get details of a specific project.

**Response:**
```json
{
  "success": true,
  "project": {
    "id": "123456789",
    "title": "Build E-commerce Website",
    ...
  }
}
```

### Update Project
**PUT** `/projects/:id`

Update an existing project (requires authentication and ownership).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (fields to update)
```json
{
  "title": "Updated Title",
  "status": "in-progress"
}
```

### Delete Project
**DELETE** `/projects/:id`

Delete a project (requires authentication and ownership).

**Headers:** `Authorization: Bearer <token>`

---

## Proposal Endpoints

### Create Proposal
**POST** `/proposals`

Submit a proposal for a project.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "projectId": "123456789",
  "coverLetter": "Dear Client, I am interested...",
  "bidAmount": 3500,
  "deliveryTime": "2 weeks"
}
```

**Response:**
```json
{
  "success": true,
  "proposal": {
    "id": "987654321",
    "projectId": "123456789",
    "freelancer": {
      "id": "111222333",
      "name": "Freelancer Name"
    },
    "coverLetter": "Dear Client...",
    "bidAmount": 3500,
    "deliveryTime": "2 weeks",
    "status": "pending"
  }
}
```

### Get Proposals for Project
**GET** `/proposals/project/:projectId`

Get all proposals for a specific project.

**Headers:** `Authorization: Bearer <token>`

### Get Freelancer's Proposals
**GET** `/proposals/freelancer/:freelancerId`

Get all proposals submitted by a freelancer.

**Headers:** `Authorization: Bearer <token>`

### Update Proposal Status
**PUT** `/proposals/:id/status`

Update the status of a proposal.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "accepted" // "pending", "accepted", "rejected", "withdrawn"
}
```

---

## AI Endpoints

### AI Project Matching
**POST** `/ai/match-projects`

Get AI-powered project recommendations based on skills.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "skills": ["JavaScript", "React", "Node.js"],
  "preferences": {
    "budget": "medium",
    "duration": "short"
  }
}
```

**Response:**
```json
{
  "success": true,
  "matches": [
    {
      "id": "1",
      "title": "Build a Modern E-commerce Website",
      "matchScore": 95,
      "reason": "Perfect match for your web development and React skills"
    }
  ]
}
```

### Generate AI Proposal
**POST** `/ai/generate-proposal`

Generate a professional proposal using AI.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "projectTitle": "Build E-commerce Website",
  "projectDescription": "Modern e-commerce platform...",
  "userSkills": ["React", "Node.js"],
  "userExperience": "5 years"
}
```

**Response:**
```json
{
  "success": true,
  "proposal": {
    "coverLetter": "Dear Client...",
    "confidence": 85,
    "aiGenerated": true
  }
}
```

### Analyze Skills
**POST** `/ai/analyze-skills`

Get AI-powered skills analysis and recommendations.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentSkills": ["JavaScript", "React"],
  "projectsCompleted": 10
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "currentLevel": "Intermediate",
    "strengths": ["Web Development", "JavaScript", "React"],
    "recommendations": [
      {
        "skill": "TypeScript",
        "reason": "High demand skill that complements your JavaScript expertise",
        "difficulty": "Medium",
        "estimatedLearningTime": "2-3 weeks"
      }
    ],
    "marketDemand": {
      "currentSkills": "High",
      "potentialEarningsIncrease": "25-40%"
    }
  }
}
```

### Suggest Bid Amount
**POST** `/ai/suggest-bid`

Get AI-powered bid amount suggestions.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "projectBudget": {
    "min": 2000,
    "max": 5000
  },
  "projectComplexity": "medium",
  "yourExperience": "intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "suggestion": {
    "recommendedBid": 3500,
    "bidRange": {
      "min": 2200,
      "max": 4500
    },
    "reasoning": "Based on project complexity, market rates, and your experience level",
    "competitiveness": "High",
    "winProbability": "75%"
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/:id`

Get public profile of a user.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "both",
    "avatar": "https://via.placeholder.com/150",
    "bio": "Full-stack developer...",
    "skills": ["React", "Node.js"],
    "rating": 4.8,
    "completedProjects": 15,
    "earnings": 25000
  }
}
```

### Update User Profile
**PUT** `/users/:id`

Update user profile (requires authentication).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "bio": "Experienced full-stack developer...",
  "skills": ["React", "Node.js", "TypeScript"],
  "avatar": "https://example.com/avatar.jpg"
}
```

### Get All Users
**GET** `/users`

Get list of all users (freelancers).

**Response:**
```json
{
  "success": true,
  "count": 10,
  "users": [...]
}
```

---

## Health Check

### Check API Status
**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "NNIT AI Enterprise API is running"
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- API endpoints are rate-limited to 100 requests per 15 minutes per IP
- Rate limiting applies to `/api/*` routes
- Exceeding the limit returns a `429 Too Many Requests` error

---

## Categories

Available project categories:
- `web-development`
- `mobile-development`
- `design`
- `writing`
- `marketing`
- `data-science`
- `other`

## Duration Options

Available project duration options:
- `less-than-week`
- `1-2-weeks`
- `2-4-weeks`
- `1-3-months`
- `3-6-months`
- `more-than-6-months`

## Status Options

Project statuses:
- `open` - Project is open for proposals
- `in-progress` - Project is being worked on
- `completed` - Project is completed
- `cancelled` - Project was cancelled

Proposal statuses:
- `pending` - Proposal is under review
- `accepted` - Proposal was accepted
- `rejected` - Proposal was rejected
- `withdrawn` - Proposal was withdrawn by freelancer
