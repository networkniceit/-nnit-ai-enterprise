"""
Video AI API endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.services.ai.video_engine import video_ai_engine
from app.core.auth import get_current_user

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class VideoProcessRequest(BaseModel):
    video_base64: str = Field(..., description="Base64 encoded video data")
    operation: str = Field(..., description="Operation to perform")
    start_time: Optional[float] = Field(None, description="Start time for trim")
    end_time: Optional[float] = Field(None, description="End time for trim")
    output_format: Optional[str] = Field(None, description="Output format for convert")
    quality: Optional[str] = Field(None, description="Quality for convert")
    subtitles: Optional[str] = Field(None, description="Subtitles content")


@router.post("/process")
@limiter.limit("5/minute")
async def process_video(
    request: VideoProcessRequest,
    current_user = Depends(get_current_user)
):
    """Process video with various operations"""
    try:
        kwargs = {}
        if request.start_time is not None:
            kwargs["start_time"] = request.start_time
        if request.end_time is not None:
            kwargs["end_time"] = request.end_time
        if request.output_format:
            kwargs["output_format"] = request.output_format
        if request.quality:
            kwargs["quality"] = request.quality
        if request.subtitles:
            kwargs["subtitles"] = request.subtitles
        
        result = await video_ai_engine.process_video(
            video_base64=request.video_base64,
            operation=request.operation,
            **kwargs
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
