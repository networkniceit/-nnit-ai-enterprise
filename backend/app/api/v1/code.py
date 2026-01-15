"""
Code AI API endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.services.ai.code_engine import code_ai_engine
from app.core.auth import get_current_user

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class GenerateCodeRequest(BaseModel):
    description: str = Field(..., description="What the code should do")
    language: str = Field(default="python", description="Programming language")
    include_comments: bool = Field(default=True, description="Include code comments")


class DebugCodeRequest(BaseModel):
    code: str = Field(..., description="Code to debug")
    language: str = Field(..., description="Programming language")
    error_message: Optional[str] = Field(None, description="Error message if any")


class ExplainCodeRequest(BaseModel):
    code: str = Field(..., description="Code to explain")
    language: str = Field(..., description="Programming language")


class OptimizeCodeRequest(BaseModel):
    code: str = Field(..., description="Code to optimize")
    language: str = Field(..., description="Programming language")


class ConvertCodeRequest(BaseModel):
    code: str = Field(..., description="Code to convert")
    from_language: str = Field(..., description="Source language")
    to_language: str = Field(..., description="Target language")


@router.post("/generate")
@limiter.limit("10/minute")
async def generate_code(
    request: GenerateCodeRequest,
    current_user = Depends(get_current_user)
):
    """Generate code from description"""
    try:
        result = await code_ai_engine.generate_code(
            description=request.description,
            language=request.language,
            include_comments=request.include_comments
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/debug")
@limiter.limit("15/minute")
async def debug_code(
    request: DebugCodeRequest,
    current_user = Depends(get_current_user)
):
    """Debug code and suggest fixes"""
    try:
        result = await code_ai_engine.debug_code(
            code=request.code,
            language=request.language,
            error_message=request.error_message
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/explain")
@limiter.limit("15/minute")
async def explain_code(
    request: ExplainCodeRequest,
    current_user = Depends(get_current_user)
):
    """Explain what code does"""
    try:
        result = await code_ai_engine.explain_code(
            code=request.code,
            language=request.language
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/optimize")
@limiter.limit("10/minute")
async def optimize_code(
    request: OptimizeCodeRequest,
    current_user = Depends(get_current_user)
):
    """Optimize code for performance"""
    try:
        result = await code_ai_engine.optimize_code(
            code=request.code,
            language=request.language
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/convert")
@limiter.limit("10/minute")
async def convert_code(
    request: ConvertCodeRequest,
    current_user = Depends(get_current_user)
):
    """Convert code between languages"""
    try:
        result = await code_ai_engine.convert_code(
            code=request.code,
            from_language=request.from_language,
            to_language=request.to_language
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
