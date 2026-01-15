"""
Jobs API endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.auth import get_current_user, get_supabase_client

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


class JobCreate(BaseModel):
    title: str = Field(..., description="Job title")
    description: str = Field(..., description="Job description")
    category: str = Field(..., description="Job category")
    budget: float = Field(..., ge=0, description="Job budget")
    deadline: Optional[str] = Field(None, description="Job deadline")
    skills_required: List[str] = Field(default=[], description="Required skills")


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    budget: Optional[float] = None
    deadline: Optional[str] = None
    skills_required: Optional[List[str]] = None
    status: Optional[str] = None


@router.get("/")
async def list_jobs(
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """List all jobs"""
    try:
        query = supabase.table("jobs").select("*")
        if category:
            query = query.eq("category", category)
        
        response = query.range(skip, skip + limit - 1).execute()
        return {"success": True, "data": response.data, "count": len(response.data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
async def create_job(
    job: JobCreate,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Create a new job"""
    try:
        job_data = {
            **job.dict(),
            "user_id": current_user.user.id,
            "status": "open",
            "created_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("jobs").insert(job_data).execute()
        return {"success": True, "data": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{job_id}")
async def get_job(
    job_id: int,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Get job by ID"""
    try:
        response = supabase.table("jobs").select("*").eq("id", job_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"success": True, "data": response.data[0]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{job_id}")
async def update_job(
    job_id: int,
    job: JobUpdate,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Update job"""
    try:
        update_data = {k: v for k, v in job.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase.table("jobs").update(update_data).eq("id", job_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"success": True, "data": response.data[0]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{job_id}")
async def delete_job(
    job_id: int,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Delete job"""
    try:
        response = supabase.table("jobs").delete().eq("id", job_id).execute()
        return {"success": True, "message": "Job deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
