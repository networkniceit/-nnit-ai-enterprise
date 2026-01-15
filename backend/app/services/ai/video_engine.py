"""
Video AI Engine using FFmpeg
Provides video processing, trimming, and subtitle generation
"""

import ffmpeg
import subprocess
import base64
import tempfile
import os
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class VideoAIEngine:
    """Video processing using FFmpeg"""
    
    def __init__(self):
        self.temp_dir = tempfile.gettempdir()
    
    async def process_video(
        self,
        video_base64: str,
        operation: str = "info",
        **kwargs
    ) -> Dict[str, Any]:
        """Process video with specified operation"""
        # Save video to temp file
        temp_input = os.path.join(self.temp_dir, "input_video.mp4")
        
        try:
            # Decode base64 video
            video_bytes = base64.b64decode(video_base64)
            with open(temp_input, "wb") as f:
                f.write(video_bytes)
            
            if operation == "info":
                return await self._get_video_info(temp_input)
            elif operation == "trim":
                return await self._trim_video(temp_input, **kwargs)
            elif operation == "convert":
                return await self._convert_video(temp_input, **kwargs)
            elif operation == "add_subtitles":
                return await self._add_subtitles(temp_input, **kwargs)
            else:
                raise ValueError(f"Unknown operation: {operation}")
        finally:
            # Cleanup
            if os.path.exists(temp_input):
                os.remove(temp_input)
    
    async def _get_video_info(self, video_path: str) -> Dict[str, Any]:
        """Get video information"""
        try:
            probe = ffmpeg.probe(video_path)
            video_info = next(s for s in probe['streams'] if s['codec_type'] == 'video')
            
            return {
                "duration": float(probe['format']['duration']),
                "width": int(video_info['width']),
                "height": int(video_info['height']),
                "fps": eval(video_info['r_frame_rate']),
                "codec": video_info['codec_name'],
                "size_bytes": int(probe['format']['size'])
            }
        except Exception as e:
            logger.error(f"Failed to get video info: {e}")
            raise Exception(f"Video info extraction failed: {str(e)}")
    
    async def _trim_video(
        self,
        video_path: str,
        start_time: float = 0,
        end_time: Optional[float] = None
    ) -> Dict[str, Any]:
        """Trim video"""
        temp_output = os.path.join(self.temp_dir, "output_video.mp4")
        
        try:
            stream = ffmpeg.input(video_path, ss=start_time)
            if end_time:
                stream = stream.output(temp_output, t=end_time - start_time, c='copy')
            else:
                stream = stream.output(temp_output, c='copy')
            
            ffmpeg.run(stream, overwrite_output=True, capture_stdout=True, capture_stderr=True)
            
            # Read output and encode to base64
            with open(temp_output, "rb") as f:
                output_bytes = f.read()
            
            output_base64 = base64.b64encode(output_bytes).decode('utf-8')
            
            return {
                "video_base64": output_base64,
                "start_time": start_time,
                "end_time": end_time,
                "operation": "trim"
            }
        finally:
            if os.path.exists(temp_output):
                os.remove(temp_output)
    
    async def _convert_video(
        self,
        video_path: str,
        output_format: str = "mp4",
        quality: str = "medium"
    ) -> Dict[str, Any]:
        """Convert video format"""
        temp_output = os.path.join(self.temp_dir, f"output_video.{output_format}")
        
        quality_map = {
            "low": "28",
            "medium": "23",
            "high": "18"
        }
        crf = quality_map.get(quality, "23")
        
        try:
            stream = ffmpeg.input(video_path)
            stream = ffmpeg.output(stream, temp_output, crf=crf)
            ffmpeg.run(stream, overwrite_output=True, capture_stdout=True, capture_stderr=True)
            
            with open(temp_output, "rb") as f:
                output_bytes = f.read()
            
            output_base64 = base64.b64encode(output_bytes).decode('utf-8')
            
            return {
                "video_base64": output_base64,
                "format": output_format,
                "quality": quality,
                "operation": "convert"
            }
        finally:
            if os.path.exists(temp_output):
                os.remove(temp_output)
    
    async def _add_subtitles(
        self,
        video_path: str,
        subtitles: str,
        style: str = "default"
    ) -> Dict[str, Any]:
        """Add subtitles to video"""
        temp_output = os.path.join(self.temp_dir, "output_video_subs.mp4")
        temp_subs = os.path.join(self.temp_dir, "subtitles.srt")
        
        try:
            # Write subtitles to file
            with open(temp_subs, "w") as f:
                f.write(subtitles)
            
            # Add subtitles using FFmpeg
            stream = ffmpeg.input(video_path)
            stream = ffmpeg.output(
                stream,
                temp_output,
                vf=f"subtitles={temp_subs}",
                c='libx264'
            )
            ffmpeg.run(stream, overwrite_output=True, capture_stdout=True, capture_stderr=True)
            
            with open(temp_output, "rb") as f:
                output_bytes = f.read()
            
            output_base64 = base64.b64encode(output_bytes).decode('utf-8')
            
            return {
                "video_base64": output_base64,
                "subtitles_added": True,
                "operation": "add_subtitles"
            }
        finally:
            if os.path.exists(temp_output):
                os.remove(temp_output)
            if os.path.exists(temp_subs):
                os.remove(temp_subs)


# Create singleton instance
video_ai_engine = VideoAIEngine()
