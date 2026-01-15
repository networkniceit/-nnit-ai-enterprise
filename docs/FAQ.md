# Frequently Asked Questions (FAQ)

## General Questions

### What is NNIT AI Enterprise?

NNIT AI Enterprise is a comprehensive, production-ready platform that provides freelancers with cutting-edge AI tools for text generation, code assistance, image creation, audio processing, and video editing - all built on 100% free services.

### Who created this platform?

Created by **Solomon Omomeje Ayodele**, owner of **Network Nice IT Tec (NNIT)**.

### Is it really free?

Yes! The platform uses only free-tier services:
- Groq (14,400 requests/day)
- Hugging Face (1,000 requests/day)
- Supabase (500MB database)
- Vercel (100GB bandwidth/month)
- Render (750 hours/month)

### What platforms are supported?

- **Web**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS and Android via Expo Go or standalone app
- **Desktop**: Through web browser

## Installation & Setup

### Do I need coding experience?

No! Use the automated setup scripts:
- Linux/Mac: `./scripts/setup/setup.sh`
- Windows: `scripts\setup\setup.bat`

### What are the system requirements?

- Node.js 18+
- Python 3.11+
- 4GB RAM minimum
- 2GB free disk space
- Internet connection

### Setup is failing. What should I do?

1. Check prerequisites are installed
2. Verify internet connection
3. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
4. Open a GitHub issue if problem persists

### How do I get API keys?

See [FREE_SERVICES_SETUP.md](FREE_SERVICES_SETUP.md) for detailed instructions on obtaining all required API keys for free.

## Features

### What AI models are used?

- **Text/Code**: Groq's Llama 3.1 (70B parameters)
- **Images**: Stable Diffusion 2.1
- **Audio TTS**: Facebook FastSpeech2
- **Audio STT**: OpenAI Whisper Base
- **Video**: FFmpeg (open-source)

### Can I use this commercially?

Yes! The platform is MIT licensed. However, check each AI service's terms for commercial use restrictions.

### What languages are supported?

- **Text AI**: 100+ languages for translation
- **Code AI**: Python, JavaScript, Java, C++, Go, Rust, and more
- **Audio STT**: English (expandable to other languages)

### Are there file size limits?

- **Uploads**: 10MB (configurable)
- **Images**: 512x512 to 1024x1024 pixels
- **Audio**: Up to 25MB
- **Video**: Up to 50MB (processing)

### Can I process videos offline?

No, video processing requires the backend API. However, the mobile app supports offline viewing of previously generated content.

## Technical Questions

### Can I self-host this?

Yes! The platform is designed to be self-hosted. See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions.

### Is my data secure?

Yes:
- All data encrypted in transit (HTTPS)
- Database access restricted with Row Level Security
- Authentication via Supabase JWT
- API keys never exposed to frontend

### What happens if a free tier limit is reached?

- Groq: Requests are throttled (14,400/day limit)
- Hugging Face: Returns 503 error (1,000/day limit)
- Supabase: Read-only mode if storage full
- Consider upgrading or optimizing usage

### Can I use my own AI models?

Yes! The platform architecture allows swapping AI engines. Modify the engine files in `backend/app/services/ai/`.

### Does it support team collaboration?

Currently single-user focused, but the architecture supports multi-user. Team features are planned for future releases.

## Mobile App

### Do I need Expo Go?

For development, yes. For production, you can build a standalone app with EAS Build.

### Can I build for iOS on Windows?

Yes, using EAS Build cloud service. However, you'll need an Apple Developer account ($99/year) to distribute on App Store.

### Does the mobile app work offline?

Partially. Previously generated content is cached, but AI processing requires internet connection.

### How do I scan QR codes?

Use the built-in QR scanner in the mobile app's certificate verification feature.

## Performance

### Why is the first API request slow?

- Groq: Very fast (<1 second)
- Hugging Face: First request loads model (~30 seconds), subsequent requests are faster (~3-5 seconds)
- Render free tier: Server sleeps after 15 minutes inactivity (~30 second cold start)

### How can I improve performance?

1. Use Groq for text/code (extremely fast)
2. Pre-warm Hugging Face models
3. Upgrade Render to paid tier (no cold starts)
4. Cache frequently used results
5. Use smaller image resolutions

### What's the expected latency?

- **Text generation**: 1-3 seconds
- **Code generation**: 2-5 seconds
- **Image generation**: 10-30 seconds (first) / 5-10 seconds (subsequent)
- **Audio TTS**: 3-8 seconds
- **Audio STT**: 5-15 seconds
- **Video processing**: Depends on length and operation

## Troubleshooting

### "Module not found" errors?

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules
npm install
```

### Database connection failed?

1. Check `.env` file has correct `SUPABASE_URL` and `SUPABASE_KEY`
2. Verify Supabase project is running
3. Check internet connection

### "Rate limit exceeded"?

You've hit a service limit. Wait a few minutes or upgrade to paid tier.

### Images not generating?

- First request takes ~30 seconds (model loading)
- Check `HUGGINGFACE_API_KEY` is valid
- Try with simpler prompts
- Check API quota at huggingface.co

### Frontend not connecting to backend?

1. Verify backend is running on port 8000
2. Check `VITE_API_BASE_URL` in frontend/.env
3. Disable browser CORS extensions
4. Check network tab for errors

## Deployment

### Can I deploy for free?

Yes! Use:
- Vercel for frontend (free)
- Render for backend (free with cold starts)
- Supabase for database (free tier)

### What about production-grade deployment?

Consider upgrading:
- Render Starter ($7/month) - no cold starts
- Supabase Pro ($25/month) - 8GB database
- Vercel Pro ($20/month) - advanced features

### How do I enable HTTPS?

Vercel and Render provide HTTPS automatically. For self-hosted, use Let's Encrypt with Nginx.

## Contributing

### Can I contribute?

Yes! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### I found a bug. What should I do?

1. Check if it's already reported
2. Create a GitHub issue with details
3. Include reproduction steps
4. Mention your environment

### Can I add new AI models?

Yes! Fork the repository, add your model, and submit a pull request.

## Support

### Where can I get help?

- **Documentation**: /docs folder
- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions
- **API Docs**: http://localhost:8000/docs

### Is there a community?

Check GitHub for:
- Discussions
- Issues  
- Pull Requests
- Contributors

### Can I hire the creator?

Solomon Omomeje Ayodele is available for consulting and custom development. Contact via GitHub.

---

**Still have questions?**  
Open an issue on GitHub: https://github.com/networkniceit/-nnit-ai-enterprise/issues

**Created by Solomon Omomeje Ayodele | Network Nice IT Tec (NNIT)**
