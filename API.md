# API Documentation

## Base URL
```
https://api.nnit-ai-enterprise.com/v1
```

## Authentication

All authentication endpoints are prefixed with `/auth`.

### Register

Create a new user account.

**Endpoint:** `POST /auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "NNIT AI Tec",
  "email": "nnit_ai@enterprise.com",
  "password": "YourNewStrongPassword!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "12345",
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

Authenticate an existing user.

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "nnit_ai@enterprise.com",
  "password": "YourNewStrongPassword!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "12345",
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Change Password

Change the password for an authenticated user.

**Endpoint:** `POST /auth/change-password`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <your-token>
```

**Request Body:**
```json
{
  "currentPassword": "YourNewStrongPassword!",
  "newPassword": "YourNewStrongPassword!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "New password does not meet requirements"
}
```

### Logout

Invalidate the current user session.

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <your-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Get User Profile

Retrieve the authenticated user's profile information.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <your-token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "12345",
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "createdAt": "2026-01-19T10:00:00Z",
    "updatedAt": "2026-01-19T10:00:00Z"
  }
}
```

## Error Handling

All endpoints follow a consistent error response format:

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

### Common Error Codes

- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - User doesn't have permission for this action
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated requests:** 1000 requests per hour
- **Unauthenticated requests:** 100 requests per hour

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642598400
```
