# API Documentation

## NNIT AI Enterprise - AI-Powered Freelancer Platform

This document provides comprehensive API documentation for the NNIT AI Enterprise platform.

## Base URL

```
https://api.nnit-ai-enterprise.com/v1
```

## Authentication

All API requests require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Authentication Endpoints

### Register

Create a new user account.

**Endpoint:** `POST /auth/register`

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
    "id": "user_123456",
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "createdAt": "2026-01-19T20:00:00Z"
  }
}
```

**Example Request:**

```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "password": "YourNewStrongPassword!"
  }'
```

### Login

Authenticate and receive a JWT token.

**Endpoint:** `POST /auth/login`

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123456",
      "username": "NNIT AI Tec",
      "email": "nnit_ai@enterprise.com"
    }
  }
}
```

**Example Request:**

```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nnit_ai@enterprise.com",
    "password": "YourNewStrongPassword!"
  }'
```

### Change Password

Change the password for the authenticated user.

**Endpoint:** `POST /auth/change-password`

**Authentication:** Required (Bearer Token)

**Request Body:**

```json
{
  "currentPassword": "YourNewStrongPassword!",
  "newPassword": "Scdspas@@4.!",
  "confirmPassword": "Scdspas@@4.!"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Example Request:**

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

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "error": "Current password is incorrect"
}
```

### Forgot Password

Request a password reset email.

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**

```json
{
  "email": "nnit_ai@enterprise.com"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

**Example Request:**

```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nnit_ai@enterprise.com"
  }'
```

### Reset Password

Reset password using the token received via email.

**Endpoint:** `POST /auth/reset-password`

**Request Body:**

```json
{
  "token": "reset_token_received_via_email",
  "newPassword": "YourNewStrongPassword!",
  "confirmPassword": "YourNewStrongPassword!"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Example Request:**

```bash
curl -X POST https://api.nnit-ai-enterprise.com/v1/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset_token_received_via_email",
    "newPassword": "YourNewStrongPassword!",
    "confirmPassword": "YourNewStrongPassword!"
  }'
```

## User Endpoints

### Get User Profile

Retrieve the authenticated user's profile.

**Endpoint:** `GET /users/me`

**Authentication:** Required (Bearer Token)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "user_123456",
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "profile": {
      "firstName": "NNIT",
      "lastName": "AI Tec",
      "bio": "AI-powered freelancer",
      "avatar": "https://api.nnit-ai-enterprise.com/avatars/user_123456.jpg"
    },
    "createdAt": "2026-01-19T20:00:00Z",
    "updatedAt": "2026-01-19T20:00:00Z"
  }
}
```

**Example Request:**

```bash
curl -X GET https://api.nnit-ai-enterprise.com/v1/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Update User Profile

Update the authenticated user's profile.

**Endpoint:** `PUT /users/me`

**Authentication:** Required (Bearer Token)

**Request Body:**

```json
{
  "username": "NNIT AI Tec",
  "profile": {
    "firstName": "NNIT",
    "lastName": "AI Tec",
    "bio": "AI-powered freelancer specializing in enterprise solutions"
  }
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_123456",
    "username": "NNIT AI Tec",
    "email": "nnit_ai@enterprise.com",
    "profile": {
      "firstName": "NNIT",
      "lastName": "AI Tec",
      "bio": "AI-powered freelancer specializing in enterprise solutions"
    }
  }
}
```

**Example Request:**

```bash
curl -X PUT https://api.nnit-ai-enterprise.com/v1/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "username": "NNIT AI Tec",
    "profile": {
      "firstName": "NNIT",
      "lastName": "AI Tec",
      "bio": "AI-powered freelancer specializing in enterprise solutions"
    }
  }'
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `400` - Bad Request: Invalid input data
- `401` - Unauthorized: Invalid or missing authentication token
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `422` - Unprocessable Entity: Validation error
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Anonymous requests:** 100 requests per hour
- **Authenticated requests:** 1000 requests per hour

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642617600
```

## Security Best Practices

1. **Never commit passwords or tokens to version control**
2. Always use HTTPS for API requests
3. Store tokens securely (e.g., in environment variables or secure vaults)
4. Rotate tokens regularly
5. Use strong passwords (minimum 12 characters with mixed case, numbers, and symbols)
6. Implement proper error handling to avoid exposing sensitive information

## Example User Credentials (For Testing Only)

**Important:** These are placeholder credentials for documentation purposes only. Never use these in production!

```
Username: NNIT AI Tec
Email: nnit_ai@enterprise.com
Password: YourNewStrongPassword!
```

## Support

For API support and questions, contact:
- Email: support@nnit-ai-enterprise.com
- Documentation: https://docs.nnit-ai-enterprise.com
