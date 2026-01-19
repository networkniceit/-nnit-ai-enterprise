# NNIT AI Enterprise - API Documentation

## Overview

This document provides comprehensive API documentation for the NNIT AI Enterprise platform. All endpoints use JSON format for request and response bodies.

Base URL: `https://api.nnit-ai-enterprise.com/v1`

## Authentication

The API uses JWT (JSON Web Token) based authentication. Include the token in the Authorization header for protected endpoints:

```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### 1. User Registration

**Endpoint:** `POST /auth/register`

**Description:** Register a new user account.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "NNIT AI Tec",
  "email": "nnit_ai@enterprise.com",
  "password": "YourNewStrongPassword!"
}
```

**Response (Success - 201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_123456789",
      "name": "NNIT AI Tec",
      "email": "nnit_ai@enterprise.com",
      "createdAt": "2026-01-19T20:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Email already exists",
  "errors": [
    {
      "field": "email",
      "message": "This email is already registered"
    }
  ]
}
```

**Example using cURL:**
```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "password": "YourNewStrongPassword!"
  }'
```

---

### 2. User Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate a user and receive a JWT token.

**Request Headers:**
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

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123456789",
      "name": "NNIT AI Tec",
      "email": "nnit_ai@enterprise.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

**Response (Error - 401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Example using cURL:**
```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nnit_ai@enterprise.com",
    "password": "YourNewStrongPassword!"
  }'
```

---

### 3. Change Password

**Endpoint:** `POST /auth/change-password`

**Description:** Change the password for an authenticated user.

**Authentication Required:** Yes

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "currentPassword": "YourNewStrongPassword!",
  "newPassword": "YourNewStrongPassword!",
  "confirmPassword": "YourNewStrongPassword!"
}
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Response (Error - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Current password is incorrect",
  "errors": [
    {
      "field": "currentPassword",
      "message": "The current password you provided is incorrect"
    }
  ]
}
```

**Response (Error - 401 Unauthorized):**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**Example using cURL:**
```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "currentPassword": "YourNewStrongPassword!",
    "newPassword": "YourNewStrongPassword!",
    "confirmPassword": "YourNewStrongPassword!"
  }'
```

---

### 4. Get User Profile

**Endpoint:** `GET /auth/profile`

**Description:** Retrieve the authenticated user's profile information.

**Authentication Required:** Yes

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123456789",
      "name": "NNIT AI Tec",
      "email": "nnit_ai@enterprise.com",
      "createdAt": "2026-01-19T20:00:00.000Z",
      "updatedAt": "2026-01-19T20:00:00.000Z"
    }
  }
}
```

**Example using cURL:**
```bash
curl -X GET https://api.nnit-ai-enterprise.com/v1/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 5. Logout

**Endpoint:** `POST /auth/logout`

**Description:** Logout the authenticated user and invalidate the token.

**Authentication Required:** Yes

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Example using cURL:**
```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required or invalid |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limiting

API requests are rate limited to:
- **Unauthenticated requests:** 100 requests per hour per IP
- **Authenticated requests:** 1000 requests per hour per user

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642636800
```

---

## Security Best Practices

1. **Always use HTTPS** for API requests in production
2. **Store tokens securely** - Never expose JWT tokens in client-side code
3. **Use strong passwords** - Minimum 8 characters with mixed case, numbers, and special characters
4. **Rotate tokens regularly** - Implement token refresh mechanisms
5. **Validate all input** - Sanitize user input before processing

---

## Support

For API support and questions:
- Email: support@nnit-ai-enterprise.com
- Documentation: https://docs.nnit-ai-enterprise.com
- GitHub Issues: https://github.com/networkniceit/-nnit-ai-enterprise/issues

---

## Changelog

### Version 1.0.0 (2026-01-19)
- Initial API documentation
- User registration and authentication endpoints
- Password change functionality
- User profile management
