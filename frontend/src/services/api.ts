import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('supabase.auth.token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Text AI
  text: {
    write: (data: any) => api.post('/api/v1/text/write', data),
    grammar: (data: any) => api.post('/api/v1/text/grammar', data),
    translate: (data: any) => api.post('/api/v1/text/translate', data),
    summarize: (data: any) => api.post('/api/v1/text/summarize', data),
  },

  // Code AI
  code: {
    generate: (data: any) => api.post('/api/v1/code/generate', data),
    debug: (data: any) => api.post('/api/v1/code/debug', data),
    explain: (data: any) => api.post('/api/v1/code/explain', data),
    optimize: (data: any) => api.post('/api/v1/code/optimize', data),
    convert: (data: any) => api.post('/api/v1/code/convert', data),
  },

  // Image AI
  image: {
    generate: (data: any) => api.post('/api/v1/image/generate', data),
    variations: (data: any) => api.post('/api/v1/image/variations', data),
  },

  // Audio AI
  audio: {
    tts: (data: any) => api.post('/api/v1/audio/tts', data),
    stt: (data: any) => api.post('/api/v1/audio/stt', data),
  },

  // Video AI
  video: {
    process: (data: any) => api.post('/api/v1/video/process', data),
  },

  // Jobs
  jobs: {
    list: (params?: any) => api.get('/api/v1/jobs', { params }),
    get: (id: number) => api.get(`/api/v1/jobs/${id}`),
    create: (data: any) => api.post('/api/v1/jobs', data),
    update: (id: number, data: any) => api.patch(`/api/v1/jobs/${id}`, data),
    delete: (id: number) => api.delete(`/api/v1/jobs/${id}`),
  },

  // Portfolio
  portfolio: {
    list: (params?: any) => api.get('/api/v1/portfolio', { params }),
    get: (id: number) => api.get(`/api/v1/portfolio/${id}`),
    create: (data: any) => api.post('/api/v1/portfolio', data),
    update: (id: number, data: any) => api.patch(`/api/v1/portfolio/${id}`, data),
    delete: (id: number) => api.delete(`/api/v1/portfolio/${id}`),
  },
};

export default api;
