/**
 * Shared constants for NNIT AI Enterprise
 * Used across frontend, mobile, and backend
 */

export const COMPANY = {
  name: 'Network Nice IT Tec',
  shortName: 'NNIT',
  owner: 'Solomon Omomeje Ayodele',
  tagline: 'Professional AI Freelancer Platform (100% Free to Start)',
  founded: '2026',
};

export const BRANDING = {
  colors: {
    primary: '#1e40af', // Deep Blue
    primaryLight: '#3b82f6', // Bright Blue
    accent: '#f59e0b', // Amber/Gold
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
  },
};

export const AI_ENGINES = {
  text: {
    name: 'Text AI',
    description: 'Writing assistance, grammar checking, translation',
    icon: '📝',
    color: 'from-blue-500 to-cyan-500',
  },
  code: {
    name: 'Code AI',
    description: 'Code generation, debugging, optimization',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
  },
  image: {
    name: 'Image AI',
    description: 'Text-to-image generation',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
  },
  audio: {
    name: 'Audio AI',
    description: 'Text-to-speech and speech-to-text',
    icon: '🔊',
    color: 'from-orange-500 to-red-500',
  },
  video: {
    name: 'Video AI',
    description: 'Video processing and subtitles',
    icon: '🎬',
    color: 'from-indigo-500 to-purple-500',
  },
};

export const API_ENDPOINTS = {
  text: {
    write: '/api/v1/text/write',
    grammar: '/api/v1/text/grammar',
    translate: '/api/v1/text/translate',
    summarize: '/api/v1/text/summarize',
  },
  code: {
    generate: '/api/v1/code/generate',
    debug: '/api/v1/code/debug',
    explain: '/api/v1/code/explain',
    optimize: '/api/v1/code/optimize',
    convert: '/api/v1/code/convert',
  },
  image: {
    generate: '/api/v1/image/generate',
    variations: '/api/v1/image/variations',
  },
  audio: {
    tts: '/api/v1/audio/tts',
    stt: '/api/v1/audio/stt',
  },
  video: {
    process: '/api/v1/video/process',
  },
  jobs: {
    list: '/api/v1/jobs',
    create: '/api/v1/jobs',
    get: (id: number) => `/api/v1/jobs/${id}`,
    update: (id: number) => `/api/v1/jobs/${id}`,
    delete: (id: number) => `/api/v1/jobs/${id}`,
  },
  portfolio: {
    list: '/api/v1/portfolio',
    create: '/api/v1/portfolio',
    get: (id: number) => `/api/v1/portfolio/${id}`,
    update: (id: number) => `/api/v1/portfolio/${id}`,
    delete: (id: number) => `/api/v1/portfolio/${id}`,
  },
};

export const RATE_LIMITS = {
  text: 10,
  code: 10,
  image: 5,
  audio: 10,
  video: 5,
};

export const FILE_LIMITS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    video: ['video/mp4', 'video/webm'],
    document: ['application/pdf', 'text/plain'],
  },
};

export const SUPPORTED_LANGUAGES = {
  code: [
    'python',
    'javascript',
    'typescript',
    'java',
    'c',
    'cpp',
    'csharp',
    'go',
    'rust',
    'php',
    'ruby',
    'swift',
    'kotlin',
  ],
  translation: [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi',
  ],
};

export const JOB_CATEGORIES = [
  'web-development',
  'mobile-development',
  'data-science',
  'machine-learning',
  'design',
  'writing',
  'marketing',
  'consulting',
  'other',
];

export const PORTFOLIO_CATEGORIES = [
  'web-development',
  'mobile-apps',
  'ai-ml',
  'design',
  'writing',
  'video-editing',
  'other',
];
