"""
Portfolio API endpoints
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


class PortfolioItemCreate(BaseModel):
    title: str = Field(..., description="Portfolio item title")
    description: str = Field(..., description="Portfolio item description")
    category: str = Field(..., description="Category")
    tags: List[str] = Field(default=[], description="Tags")
    image_url: Optional[str] = Field(None, description="Image URL")
    project_url: Optional[str] = Field(None, description="Project URL")


class PortfolioItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None
    project_url: Optional[str] = None


@router.get("/")
async def list_portfolio_items(
    skip: int = 0,
    limit: int = 20,
    user_id: Optional[str] = None,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """List portfolio items"""
    try:
        query = supabase.table("portfolios").select("*")
        if user_id:
            query = query.eq("user_id", user_id)
        else:
            query = query.eq("user_id", current_user.user.id)
        
        response = query.range(skip, skip + limit - 1).execute()
        return {"success": True, "data": response.data, "count": len(response.data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
async def create_portfolio_item(
    item: PortfolioItemCreate,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Create portfolio item"""
    try:
        item_data = {
            **item.dict(),
            "user_id": current_user.user.id,
            "created_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("portfolios").insert(item_data).execute()
        return {"success": True, "data": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{item_id}")
async def get_portfolio_item(
    item_id: int,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Get portfolio item by ID"""
    try:
        response = supabase.table("portfolios").select("*").eq("id", item_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        return {"success": True, "data": response.data[0]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{item_id}")
async def update_portfolio_item(
    item_id: int,
    item: PortfolioItemUpdate,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Update portfolio item"""
    try:
        update_data = {k: v for k, v in item.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase.table("portfolios").update(update_data).eq("id", item_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        return {"success": True, "data": response.data[0]}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{item_id}")
async def delete_portfolio_item(
    item_id: int,
    current_user = Depends(get_current_user),
    supabase = Depends(get_supabase_client)
):
    """Delete portfolio item"""
    try:
        response = supabase.table("portfolios").delete().eq("id", item_id).execute()
        return {"success": True, "message": "Portfolio item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
