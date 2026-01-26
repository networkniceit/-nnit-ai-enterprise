import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    const { state } = JSON.parse(authStorage);
    if (state.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getUser: (id: number) => api.get(`/users/${id}`),
  getUsers: (params?: any) => api.get('/users', { params }),
};

// Job API
export const jobAPI = {
  createJob: (data: any) => api.post('/jobs', data),
  getJobs: (params?: any) => api.get('/jobs', { params }),
  getJob: (id: number) => api.get(`/jobs/${id}`),
  updateJob: (id: number, data: any) => api.put(`/jobs/${id}`, data),
  deleteJob: (id: number) => api.delete(`/jobs/${id}`),
  completeJob: (id: number) => api.post(`/jobs/${id}/complete`),
};

// Proposal API
export const proposalAPI = {
  createProposal: (data: any) => api.post('/proposals', data),
  getProposalsByJob: (jobId: number) => api.get(`/proposals/job/${jobId}`),
  getProposalsByFreelancer: (freelancerId: number) => api.get(`/proposals/freelancer/${freelancerId}`),
  acceptProposal: (id: number) => api.put(`/proposals/${id}/accept`),
  rejectProposal: (id: number) => api.put(`/proposals/${id}/reject`),
};

// Message API
export const messageAPI = {
  sendMessage: (data: any) => api.post('/messages', data),
  getConversations: () => api.get('/messages/conversations'),
  getConversation: (userId: number) => api.get(`/messages/conversation/${userId}`),
  markAsRead: (id: number) => api.put(`/messages/${id}/read`),
};
