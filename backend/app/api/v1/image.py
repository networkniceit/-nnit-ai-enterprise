"""
Image AI API endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.services.ai.image_engine import image_ai_engine
from app.core.auth import get_current_user

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class GenerateImageRequest(BaseModel):
    prompt: str = Field(..., description="Image description")
    negative_prompt: str = Field(default="", description="What to avoid")
    width: int = Field(default=512, description="Image width")
    height: int = Field(default=512, description="Image height")


class GenerateVariationsRequest(BaseModel):
    prompt: str = Field(..., description="Image description")
    count: int = Field(default=3, ge=1, le=5, description="Number of variations")


@router.post("/generate")
@limiter.limit("5/minute")
async def generate_image(
    request: GenerateImageRequest,
    current_user = Depends(get_current_user)
):
    """Generate image from text prompt"""
    try:
        result = await image_ai_engine.generate_image(
            prompt=request.prompt,
            negative_prompt=request.negative_prompt,
            width=request.width,
            height=request.height
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/variations")
@limiter.limit("3/minute")
async def generate_variations(
    request: GenerateVariationsRequest,
    current_user = Depends(get_current_user)
):
    """Generate multiple image variations"""
    try:
        result = await image_ai_engine.generate_variations(
            prompt=request.prompt,
            count=request.count
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
