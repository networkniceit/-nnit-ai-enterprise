"""
Text AI API endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.services.ai.text_engine import text_ai_engine
from app.core.auth import get_current_user

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class WriteRequest(BaseModel):
    prompt: str = Field(..., description="Content description or topic")
    content_type: str = Field(default="article", description="Type of content")
    tone: str = Field(default="professional", description="Writing tone")
    length: str = Field(default="medium", description="Content length")


class GrammarRequest(BaseModel):
    text: str = Field(..., description="Text to check")


class TranslateRequest(BaseModel):
    text: str = Field(..., description="Text to translate")
    source_lang: str = Field(..., description="Source language")
    target_lang: str = Field(..., description="Target language")


class SummarizeRequest(BaseModel):
    text: str = Field(..., description="Text to summarize")
    length: str = Field(default="medium", description="Summary length")


@router.post("/write")
@limiter.limit("10/minute")
async def write_content(
    request: WriteRequest,
    current_user = Depends(get_current_user)
):
    """Generate written content"""
    try:
        result = await text_ai_engine.write_content(
            prompt=request.prompt,
            content_type=request.content_type,
            tone=request.tone,
            length=request.length
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/grammar")
@limiter.limit("20/minute")
async def check_grammar(
    request: GrammarRequest,
    current_user = Depends(get_current_user)
):
    """Check and correct grammar"""
    try:
        result = await text_ai_engine.check_grammar(request.text)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/translate")
@limiter.limit("15/minute")
async def translate_text(
    request: TranslateRequest,
    current_user = Depends(get_current_user)
):
    """Translate text between languages"""
    try:
        result = await text_ai_engine.translate(
            text=request.text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/summarize")
@limiter.limit("15/minute")
async def summarize_text(
    request: SummarizeRequest,
    current_user = Depends(get_current_user)
):
    """Summarize text"""
    try:
        result = await text_ai_engine.summarize(
            text=request.text,
            length=request.length
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
