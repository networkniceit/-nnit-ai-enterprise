# NNIT AI Enterprise Backend

FastAPI-based REST API for AI-powered freelancer platform.

## Features

- **Text AI**: Writing assistance, grammar checking, translation (Groq API)
- **Code AI**: Code generation, debugging, optimization (Groq API)
- **Image AI**: Text-to-image generation (Hugging Face)
- **Audio AI**: TTS and STT (Hugging Face)
- **Video AI**: Video processing with FFmpeg
- **Jobs Management**: CRUD operations for job listings
- **Portfolio Management**: CRUD operations for portfolio items
- **Authentication**: JWT-based auth with Supabase
- **Rate Limiting**: Per-endpoint rate limits
- **Logging**: Comprehensive logging

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy and configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

3. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

4. Access API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

```bash
pytest tests/ -v
```

## API Endpoints

### Text AI
- `POST /api/v1/text/write` - Generate written content
- `POST /api/v1/text/grammar` - Check grammar
- `POST /api/v1/text/translate` - Translate text
- `POST /api/v1/text/summarize` - Summarize text

### Code AI
- `POST /api/v1/code/generate` - Generate code
- `POST /api/v1/code/debug` - Debug code
- `POST /api/v1/code/explain` - Explain code
- `POST /api/v1/code/optimize` - Optimize code
- `POST /api/v1/code/convert` - Convert between languages

### Image AI
- `POST /api/v1/image/generate` - Generate image
- `POST /api/v1/image/variations` - Generate variations

### Audio AI
- `POST /api/v1/audio/tts` - Text-to-speech
- `POST /api/v1/audio/stt` - Speech-to-text

### Video AI
- `POST /api/v1/video/process` - Process video

### Jobs
- `GET /api/v1/jobs` - List jobs
- `POST /api/v1/jobs` - Create job
- `GET /api/v1/jobs/{id}` - Get job
- `PATCH /api/v1/jobs/{id}` - Update job
- `DELETE /api/v1/jobs/{id}` - Delete job

### Portfolio
- `GET /api/v1/portfolio` - List portfolio items
- `POST /api/v1/portfolio` - Create item
- `GET /api/v1/portfolio/{id}` - Get item
- `PATCH /api/v1/portfolio/{id}` - Update item
- `DELETE /api/v1/portfolio/{id}` - Delete item

## License

MIT License - See LICENSE file for details.
