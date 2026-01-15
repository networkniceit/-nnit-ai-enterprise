# API Reference

Complete API documentation for NNIT AI Enterprise backend.

## Base URL

- Development: `http://localhost:8000`
- Production: `https://your-backend.render.com`

## Authentication

All API endpoints (except `/` and `/health`) require authentication using JWT tokens from Supabase.

Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### System

#### GET /
Get API information

**Response:**
```json
{
  "message": "NNIT AI Enterprise API",
  "version": "1.0.0",
  "owner": "Solomon Omomeje Ayodele",
  "company": "Network Nice IT Tec (NNIT)",
  "status": "operational"
}
```

#### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "environment": "development",
  "services": {
    "api": "operational",
    "database": "operational",
    "ai_engines": "operational"
  }
}
```

### Text AI

#### POST /api/v1/text/write
Generate written content

**Request Body:**
```json
{
  "prompt": "Write about AI in freelancing",
  "content_type": "article",
  "tone": "professional",
  "length": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "Generated content...",
    "type": "article",
    "tone": "professional",
    "word_count": 250
  }
}
```

#### POST /api/v1/text/grammar
Check and correct grammar

**Request Body:**
```json
{
  "text": "Your text to check"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Your text to check",
    "corrected": "Your corrected text",
    "has_errors": true
  }
}
```

#### POST /api/v1/text/translate
Translate text

**Request Body:**
```json
{
  "text": "Hello world",
  "source_lang": "English",
  "target_lang": "Spanish"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "original": "Hello world",
    "translated": "Hola mundo",
    "source_language": "English",
    "target_language": "Spanish"
  }
}
```

### Code AI

#### POST /api/v1/code/generate
Generate code from description

**Request Body:**
```json
{
  "description": "Create a function to calculate fibonacci numbers",
  "language": "python",
  "include_comments": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "def fibonacci(n):\n    ...",
    "language": "python",
    "includes_comments": true
  }
}
```

#### POST /api/v1/code/debug
Debug code and suggest fixes

**Request Body:**
```json
{
  "code": "def add(a, b):\n    return a + c",
  "language": "python",
  "error_message": "NameError: name 'c' is not defined"
}
```

#### POST /api/v1/code/explain
Explain code functionality

**Request Body:**
```json
{
  "code": "function quickSort(arr) { ... }",
  "language": "javascript"
}
```

#### POST /api/v1/code/optimize
Optimize code for performance

**Request Body:**
```json
{
  "code": "for i in range(len(arr)): ...",
  "language": "python"
}
```

#### POST /api/v1/code/convert
Convert code between languages

**Request Body:**
```json
{
  "code": "function add(a, b) { return a + b; }",
  "from_language": "javascript",
  "to_language": "python"
}
```

### Image AI

#### POST /api/v1/image/generate
Generate image from text prompt

**Request Body:**
```json
{
  "prompt": "A professional freelancer workspace",
  "negative_prompt": "blurry, low quality",
  "width": 512,
  "height": 512
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "image_base64": "base64-encoded-image-data",
    "prompt": "A professional freelancer workspace",
    "width": 512,
    "height": 512,
    "model": "stabilityai/stable-diffusion-2-1"
  }
}
```

#### POST /api/v1/image/variations
Generate multiple image variations

**Request Body:**
```json
{
  "prompt": "Modern office design",
  "count": 3
}
```

### Audio AI

#### POST /api/v1/audio/tts
Text to speech conversion

**Request Body:**
```json
{
  "text": "Hello, welcome to NNIT AI Enterprise"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "audio_base64": "base64-encoded-audio-data",
    "text": "Hello, welcome to NNIT AI Enterprise",
    "model": "facebook/fastspeech2-en-ljspeech",
    "format": "audio/wav"
  }
}
```

#### POST /api/v1/audio/stt
Speech to text conversion

**Request Body:**
```json
{
  "audio_base64": "base64-encoded-audio-data"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Transcribed text from audio",
    "model": "openai/whisper-base",
    "confidence": 0.95
  }
}
```

### Video AI

#### POST /api/v1/video/process
Process video (trim, convert, add subtitles)

**Request Body (Trim):**
```json
{
  "video_base64": "base64-encoded-video-data",
  "operation": "trim",
  "start_time": 10.0,
  "end_time": 30.0
}
```

**Request Body (Convert):**
```json
{
  "video_base64": "base64-encoded-video-data",
  "operation": "convert",
  "output_format": "mp4",
  "quality": "medium"
}
```

**Request Body (Add Subtitles):**
```json
{
  "video_base64": "base64-encoded-video-data",
  "operation": "add_subtitles",
  "subtitles": "SRT format subtitle content"
}
```

### Jobs

#### GET /api/v1/jobs
List all jobs

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum records to return (default: 20)
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

#### POST /api/v1/jobs
Create a new job

**Request Body:**
```json
{
  "title": "Website Development",
  "description": "Need a modern website",
  "category": "web-development",
  "budget": 500.00,
  "deadline": "2026-02-01T00:00:00Z",
  "skills_required": ["React", "Node.js"]
}
```

#### GET /api/v1/jobs/{job_id}
Get job by ID

#### PATCH /api/v1/jobs/{job_id}
Update job

#### DELETE /api/v1/jobs/{job_id}
Delete job

### Portfolio

#### GET /api/v1/portfolio
List portfolio items

#### POST /api/v1/portfolio
Create portfolio item

**Request Body:**
```json
{
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce solution",
  "category": "web-development",
  "tags": ["React", "Node.js", "MongoDB"],
  "image_url": "https://...",
  "project_url": "https://..."
}
```

#### GET /api/v1/portfolio/{item_id}
Get portfolio item by ID

#### PATCH /api/v1/portfolio/{item_id}
Update portfolio item

#### DELETE /api/v1/portfolio/{item_id}
Delete portfolio item

## Rate Limits

- Text/Code/Audio: 10-20 requests/minute per endpoint
- Image: 5 requests/minute
- Video: 5 requests/minute
- Jobs/Portfolio: No rate limit (authenticated users only)

## Error Responses

```json
{
  "detail": "Error message"
}
```

**Common Status Codes:**
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## Interactive Documentation

Visit `/docs` for interactive Swagger UI or `/redoc` for ReDoc documentation.

---

**Created by Solomon Omomeje Ayodele | Network Nice IT Tec (NNIT)**
