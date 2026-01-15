"""
Audio AI API endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.services.ai.audio_engine import audio_ai_engine
from app.core.auth import get_current_user

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class TextToSpeechRequest(BaseModel):
    text: str = Field(..., description="Text to convert to speech")


class SpeechToTextRequest(BaseModel):
    audio_base64: str = Field(..., description="Base64 encoded audio data")


@router.post("/tts")
@limiter.limit("10/minute")
async def text_to_speech(
    request: TextToSpeechRequest,
    current_user = Depends(get_current_user)
):
    """Convert text to speech"""
    try:
        result = await audio_ai_engine.text_to_speech(request.text)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stt")
@limiter.limit("10/minute")
async def speech_to_text(
    request: SpeechToTextRequest,
    current_user = Depends(get_current_user)
):
    """Convert speech to text"""
    try:
        result = await audio_ai_engine.speech_to_text(request.audio_base64)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
