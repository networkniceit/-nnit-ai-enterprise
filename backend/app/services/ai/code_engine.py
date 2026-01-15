"""
Code AI Engine using Groq API
Provides code generation, debugging, and explanation
"""

import httpx
from typing import Dict, Any, Optional
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class CodeAIEngine:
    """Code AI processing using Groq API"""
    
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
    
    async def generate_code(
        self,
        description: str,
        language: str = "python",
        include_comments: bool = True
    ) -> Dict[str, Any]:
        """Generate code from description"""
        comments = "with detailed comments" if include_comments else "without comments"
        
        system_prompt = f"""You are an expert {language} programmer.
        Generate clean, efficient, and well-structured code {comments}.
        Follow best practices and modern conventions."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Generate {language} code for: {description}"}
        ]
        
        code = await self._make_request(messages, temperature=0.7)
        
        return {
            "code": code,
            "language": language,
            "description": description,
            "includes_comments": include_comments
        }
    
    async def debug_code(
        self,
        code: str,
        language: str,
        error_message: Optional[str] = None
    ) -> Dict[str, Any]:
        """Debug code and suggest fixes"""
        error_context = f"\n\nError message: {error_message}" if error_message else ""
        
        system_prompt = f"""You are an expert {language} debugger.
        Analyze the code, identify issues, and provide fixed code with explanations."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Debug this {language} code:{error_context}\n\n{code}"}
        ]
        
        result = await self._make_request(messages, temperature=0.3)
        
        return {
            "original_code": code,
            "analysis": result,
            "language": language,
            "error_provided": error_message is not None
        }
    
    async def explain_code(self, code: str, language: str) -> Dict[str, Any]:
        """Explain what code does"""
        system_prompt = """You are a code educator.
        Explain code clearly, covering purpose, logic, and key concepts.
        Use simple language suitable for learners."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Explain this {language} code:\n\n{code}"}
        ]
        
        explanation = await self._make_request(messages, temperature=0.5)
        
        return {
            "code": code,
            "explanation": explanation,
            "language": language
        }
    
    async def optimize_code(self, code: str, language: str) -> Dict[str, Any]:
        """Optimize code for performance"""
        system_prompt = f"""You are a {language} performance expert.
        Optimize the code for speed, memory usage, and readability.
        Explain the optimizations made."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Optimize this {language} code:\n\n{code}"}
        ]
        
        result = await self._make_request(messages, temperature=0.5)
        
        return {
            "original_code": code,
            "optimized": result,
            "language": language
        }
    
    async def convert_code(
        self,
        code: str,
        from_language: str,
        to_language: str
    ) -> Dict[str, Any]:
        """Convert code from one language to another"""
        system_prompt = f"""You are an expert in both {from_language} and {to_language}.
        Convert the code accurately, maintaining functionality and best practices."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Convert from {from_language} to {to_language}:\n\n{code}"}
        ]
        
        converted = await self._make_request(messages, temperature=0.3)
        
        return {
            "original_code": code,
            "converted_code": converted,
            "from_language": from_language,
            "to_language": to_language
        }


# Create singleton instance
code_ai_engine = CodeAIEngine()
