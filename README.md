# 🚀 NNIT AI Enterprise

## Professional AI-Powered Freelancer Platform (100% Free to Start)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20iOS%20%7C%20Android-brightgreen)
![Status](https://img.shields.io/badge/status-Production%20Ready-success)

**Built by Solomon Omomeje Ayodele | Network Nice IT Tec (NNIT)**

---

## 🌟 Overview

NNIT AI Enterprise is a comprehensive, production-ready platform that empowers freelancers with cutting-edge AI tools. Built entirely on free-tier services, this platform provides professional-grade AI capabilities without the cost.

### ✨ Key Features

- **5 AI Tool Categories**: Text, Code, Image, Audio, and Video processing
- **Job Management**: Create, manage, and track freelance projects
- **Portfolio Builder**: Showcase your work with AI-generated content
- **Multi-Platform**: Web (React), Mobile (iOS/Android via Expo)
- **100% Free Stack**: Uses only free-tier services (Groq, Hugging Face, Supabase)
- **Production Ready**: Full authentication, security, and deployment pipelines

---

## 🏗️ Architecture

```
├── frontend/          # React + Vite + Tailwind CSS web app
├── backend/           # Python FastAPI REST API
├── mobile/            # React Native Expo mobile app
├── shared/            # Shared utilities and constants
├── database/          # Supabase schemas and migrations
├── docs/              # Comprehensive documentation
├── scripts/           # Setup and deployment automation
└── .github/workflows/ # CI/CD pipelines
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.11+
- **Docker** and Docker Compose (optional, for containerized setup)
- **Git**

### One-Command Setup

**Linux/Mac:**
```bash
./scripts/setup/setup.sh
```

**Windows (CMD):**
```batch
scripts\setup\setup.bat
```

**Windows (PowerShell):**
```powershell
.\scripts\setup\setup.ps1
```

### Manual Setup

1. **Clone the repository:**
```bash
git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
```

2. **Setup environment variables:**
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
```

3. **Install dependencies:**

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt

# Mobile
cd ../mobile
npm install
```

4. **Start services:**

```bash
# Backend (Terminal 1)
cd backend
uvicorn main:app --reload --port 8000

# Frontend (Terminal 2)
cd frontend
npm run dev

# Mobile (Terminal 3)
cd mobile
npx expo start
```

5. **Access the platform:**
- Web: http://localhost:3000
- API: http://localhost:8000/docs
- Mobile: Scan QR code with Expo Go app

---

## 🎯 AI Capabilities

### 📝 Text AI Tools
- **Writing Assistance**: Blog posts, articles, emails
- **Grammar Check**: Advanced proofreading
- **Translation**: Multi-language support
- **Powered by**: Groq API (llama-3.1-70b-versatile)

### 💻 Code AI Tools
- **Code Generation**: Multi-language support (Python, JavaScript, Java, etc.)
- **Debugging**: Error detection and fixes
- **Code Explanation**: Understand complex code
- **Powered by**: Groq API (llama-3.1-70b-versatile)

### 🎨 Image AI Tools
- **Text-to-Image**: Generate images from descriptions
- **Style Transfer**: Apply artistic styles
- **Powered by**: Hugging Face (stabilityai/stable-diffusion-2-1)

### 🔊 Audio AI Tools
- **Text-to-Speech**: Natural voice synthesis
- **Speech-to-Text**: Accurate transcription
- **Powered by**: Hugging Face (facebook/fastspeech2-en-ljspeech, openai/whisper-base)

### 🎬 Video AI Tools
- **Video Processing**: Trim, convert, compress
- **Subtitle Generation**: Automatic captioning
- **Subtitle Embedding**: Burn subtitles into video
- **Powered by**: FFmpeg

---

## 📚 Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [API Reference](docs/API_REFERENCE.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Free Services Setup](docs/FREE_SERVICES_SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Legal & Terms](docs/LEGAL.md)
- [FAQ](docs/FAQ.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Routing**: React Router
- **State**: React Query
- **Testing**: Vitest + React Testing Library

### Backend
- **Framework**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Storage**: Supabase Storage
- **Testing**: pytest

### Mobile
- **Framework**: React Native (Expo SDK 50+)
- **Navigation**: React Navigation
- **Language**: TypeScript
- **Storage**: AsyncStorage
- **Testing**: Jest + React Native Testing Library

### AI Services (All Free Tier)
- **LLM**: Groq API (70B parameter model)
- **Image**: Hugging Face Inference API
- **Audio**: Hugging Face Models
- **Video**: FFmpeg

### DevOps
- **Hosting**: Vercel (Frontend), Render (Backend)
- **CI/CD**: GitHub Actions
- **Containers**: Docker + Docker Compose
- **Mobile Builds**: EAS Build

---

## 🎨 Branding

- **Company**: Network Nice IT Tec (NNIT)
- **Owner**: Solomon Omomeje Ayodele
- **Tagline**: "Professional AI Freelancer Platform (100% Free to Start)"
- **Colors**:
  - Primary: Deep Blue (#1e40af)
  - Secondary: Bright Blue (#3b82f6)
  - Accent: Amber/Gold (#f59e0b)

---

## 🔒 Security & Privacy

- JWT authentication with secure token handling
- Row Level Security (RLS) on all database tables
- Rate limiting on API endpoints
- Input validation and sanitization
- HTTPS only in production
- Privacy-first data handling

See [LEGAL.md](docs/LEGAL.md) for full terms and privacy policy.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Solomon Omomeje Ayodele

---

## 🙏 Acknowledgments

- Groq for blazing-fast LLM inference
- Hugging Face for open-source AI models
- Supabase for backend infrastructure
- The open-source community

---

## 📞 Contact & Support

- **Owner**: Solomon Omomeje Ayodele
- **Company**: Network Nice IT Tec (NNIT)
- **GitHub**: [@networkniceit](https://github.com/networkniceit)
- **Issues**: [GitHub Issues](https://github.com/networkniceit/-nnit-ai-enterprise/issues)

---

## 🗺️ Roadmap

- [x] Core AI engines (Text, Code, Image, Audio, Video)
- [x] Multi-platform support (Web, iOS, Android)
- [x] Job management system
- [x] Portfolio builder
- [ ] Real-time collaboration
- [ ] AI model fine-tuning
- [ ] Advanced analytics dashboard
- [ ] Marketplace for AI templates
- [ ] Team collaboration features

---

**Made with ❤️ by Solomon Omomeje Ayodele | NNIT - Empowering freelancers with AI**
