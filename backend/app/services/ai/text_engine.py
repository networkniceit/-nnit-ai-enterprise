"""
Text AI Engine using Groq API
Provides writing assistance, grammar checking, and translation
"""

import httpx
from typing import Optional, Dict, Any
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class TextAIEngine:
    """Text AI processing using Groq API"""
    
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.base_url = "https://api.groq.com/openai/v1"
        self.model = "llama-3.1-70b-versatile"
    
    async def _make_request(self, messages: list, temperature: float = 0.7) -> str:
        """Make request to Groq API"""
        if not self.api_key:
            raise ValueError("GROQ_API_KEY not configured")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": 2048
        }
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    json=payload,
                    headers=headers
                )
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
        except httpx.HTTPError as e:
            logger.error(f"Groq API request failed: {e}")
            raise Exception(f"AI service error: {str(e)}")
    
    async def write_content(
        self,
        prompt: str,
        content_type: str = "article",
        tone: str = "professional",
        length: str = "medium"
    ) -> Dict[str, Any]:
        """Generate written content"""
        system_prompt = f"""You are a professional {content_type} writer. 
        Write in a {tone} tone. Target length: {length}.
        Provide high-quality, engaging content."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
        
        content = await self._make_request(messages)
        
        return {
            "content": content,
            "type": content_type,
            "tone": tone,
            "word_count": len(content.split())
        }
    
    async def check_grammar(self, text: str) -> Dict[str, Any]:
        """Check and correct grammar"""
        system_prompt = """You are an expert grammar checker and editor.
        Analyze the text for grammar, spelling, and style issues.
        Provide corrections and explanations."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Check and correct this text:\n\n{text}"}
        ]
        
        result = await self._make_request(messages, temperature=0.3)
        
        return {
            "original": text,
            "corrected": result,
            "has_errors": text != result
        }
    
    async def translate(
        self,
        text: str,
        source_lang: str,
        target_lang: str
    ) -> Dict[str, Any]:
        """Translate text between languages"""
        system_prompt = f"""You are a professional translator.
        Translate accurately from {source_lang} to {target_lang}.
        Maintain tone, context, and cultural nuances."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
        ]
        
        translation = await self._make_request(messages, temperature=0.5)
        
        return {
            "original": text,
            "translated": translation,
            "source_language": source_lang,
            "target_language": target_lang
        }
    
    async def summarize(self, text: str, length: str = "short") -> Dict[str, Any]:
        """Summarize text"""
        length_map = {
            "short": "1-2 sentences",
            "medium": "1 paragraph",
            "long": "multiple paragraphs"
        }
        
        system_prompt = f"""You are an expert at summarization.
        Create a {length_map.get(length, 'medium')} summary of the text.
        Capture key points and main ideas."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
        ]
        
        summary = await self._make_request(messages, temperature=0.5)
        
        return {
            "original": text,
            "summary": summary,
            "length": length,
            "original_words": len(text.split()),
            "summary_words": len(summary.split())
        }


# Create singleton instance
text_ai_engine = TextAIEngine()
