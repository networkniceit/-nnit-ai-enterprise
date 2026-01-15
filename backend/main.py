"""
NNIT AI Enterprise Backend
FastAPI application entry point

Author: Solomon Omomeje Ayodele
Company: Network Nice IT Tec (NNIT)
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import logging
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1 import text, code, image, audio, video, jobs, portfolio

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(settings.LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    logger.info("Starting NNIT AI Enterprise Backend...")
    yield
    logger.info("Shutting down NNIT AI Enterprise Backend...")


# Initialize FastAPI app
app = FastAPI(
    title="NNIT AI Enterprise API",
    description="Professional AI-Powered Freelancer Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "NNIT AI Enterprise API",
        "version": "1.0.0",
        "owner": "Solomon Omomeje Ayodele",
        "company": "Network Nice IT Tec (NNIT)",
        "tagline": "Professional AI Freelancer Platform (100% Free to Start)",
        "docs": "/docs",
        "status": "operational"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "services": {
            "api": "operational",
            "database": "operational",
            "ai_engines": "operational"
        }
    }


# Include API routers
app.include_router(text.router, prefix="/api/v1/text", tags=["Text AI"])
app.include_router(code.router, prefix="/api/v1/code", tags=["Code AI"])
app.include_router(image.router, prefix="/api/v1/image", tags=["Image AI"])
app.include_router(audio.router, prefix="/api/v1/audio", tags=["Audio AI"])
app.include_router(video.router, prefix="/api/v1/video", tags=["Video AI"])
app.include_router(jobs.router, prefix="/api/v1/jobs", tags=["Jobs"])
app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["Portfolio"])


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "message": str(exc) if settings.DEBUG else "An unexpected error occurred"
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
