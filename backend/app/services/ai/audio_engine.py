"""
Audio AI Engine using Hugging Face
Provides Text-to-Speech and Speech-to-Text
"""

import httpx
import base64
from typing import Dict, Any
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class AudioAIEngine:
    """Audio AI processing using Hugging Face"""
    
    def __init__(self):
        self.api_key = settings.HUGGINGFACE_API_KEY
        self.tts_model = "facebook/fastspeech2-en-ljspeech"
        self.stt_model = "openai/whisper-base"
        self.base_url = "https://api-inference.huggingface.co/models"
    
    async def text_to_speech(self, text: str) -> Dict[str, Any]:
        """Convert text to speech"""
        if not self.api_key:
            raise ValueError("HUGGINGFACE_API_KEY not configured")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {"inputs": text}
        
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{self.base_url}/{self.tts_model}",
                    json=payload,
                    headers=headers
                )
                response.raise_for_status()
                
                # Convert audio bytes to base64
                audio_bytes = response.content
                audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
                
                return {
                    "audio_base64": audio_base64,
                    "text": text,
                    "model": self.tts_model,
                    "format": "audio/wav"
                }
        except httpx.HTTPError as e:
            logger.error(f"TTS request failed: {e}")
            if "503" in str(e):
                raise Exception("Model is loading. Please try again in a few moments.")
            raise Exception(f"Text-to-speech failed: {str(e)}")
    
    async def speech_to_text(self, audio_base64: str) -> Dict[str, Any]:
        """Convert speech to text"""
        if not self.api_key:
            raise ValueError("HUGGINGFACE_API_KEY not configured")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
        }
        
        # Decode base64 audio
        audio_bytes = base64.b64decode(audio_base64)
        
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{self.base_url}/{self.stt_model}",
                    content=audio_bytes,
                    headers=headers
                )
                response.raise_for_status()
                
                result = response.json()
                text = result.get("text", "")
                
                return {
                    "text": text,
                    "model": self.stt_model,
                    "confidence": result.get("confidence", 1.0)
                }
        except httpx.HTTPError as e:
            logger.error(f"STT request failed: {e}")
            if "503" in str(e):
                raise Exception("Model is loading. Please try again in a few moments.")
            raise Exception(f"Speech-to-text failed: {str(e)}")


# Create singleton instance
audio_ai_engine = AudioAIEngine()
