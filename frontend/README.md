# NNIT AI Enterprise Frontend

React + Vite + TypeScript + Tailwind CSS frontend application.

## Features

- **Modern Stack**: React 18, Vite, TypeScript, Tailwind CSS
- **AI Tool Pages**: Text, Code, Image, Audio, Video processing interfaces
- **Authentication**: Supabase Auth integration
- **Job Management**: Create and manage freelance jobs
- **Portfolio Builder**: Showcase your work
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

4. Access the app:
- Open http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── services/       # API and auth services
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── styles/         # Global styles
```

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT License - See LICENSE file for details.
