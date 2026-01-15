"""
Image AI Engine using Hugging Face Inference API
Provides text-to-image generation
"""

import httpx
import base64
from typing import Dict, Any
import logging
from io import BytesIO

from app.core.config import settings

logger = logging.getLogger(__name__)


class ImageAIEngine:
    """Image AI processing using Hugging Face"""
    
    def __init__(self):
        self.api_key = settings.HUGGINGFACE_API_KEY
        self.model = "stabilityai/stable-diffusion-2-1"
        self.base_url = f"https://api-inference.huggingface.co/models/{self.model}"
    
    async def generate_image(
        self,
        prompt: str,
        negative_prompt: str = "",
        width: int = 512,
        height: int = 512
    ) -> Dict[str, Any]:
        """Generate image from text prompt"""
        if not self.api_key:
            raise ValueError("HUGGINGFACE_API_KEY not configured")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": prompt,
            "parameters": {
                "negative_prompt": negative_prompt,
                "width": width,
                "height": height,
                "num_inference_steps": 30
            }
        }
        
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    self.base_url,
                    json=payload,
                    headers=headers
                )
                response.raise_for_status()
                
                # Convert image bytes to base64
                image_bytes = response.content
                image_base64 = base64.b64encode(image_bytes).decode('utf-8')
                
                return {
                    "image_base64": image_base64,
                    "prompt": prompt,
                    "negative_prompt": negative_prompt,
                    "width": width,
                    "height": height,
                    "model": self.model,
                    "format": "image/png"
                }
        except httpx.HTTPError as e:
            logger.error(f"Hugging Face API request failed: {e}")
            if "503" in str(e):
                raise Exception("Model is loading. Please try again in a few moments.")
            raise Exception(f"Image generation failed: {str(e)}")
    
    async def generate_variations(
        self,
        prompt: str,
        count: int = 3
    ) -> Dict[str, Any]:
        """Generate multiple variations of an image"""
        variations = []
        
        for i in range(count):
            # Add variation to prompt
            varied_prompt = f"{prompt} (variation {i+1})"
            result = await self.generate_image(varied_prompt)
            variations.append(result)
        
        return {
            "variations": variations,
            "count": count,
            "original_prompt": prompt
        }


# Create singleton instance
image_ai_engine = ImageAIEngine()
