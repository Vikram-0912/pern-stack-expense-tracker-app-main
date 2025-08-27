import axios from 'axios';
import { useAuthStore } from '../../../store/auth';

const api = axios.create({
  baseURL: '/api-v1',
  withCredentials: true,
});

// Attach Authorization header from store/localStorage
api.interceptors.request.use((config) => {
  try {
    // Zustand hook cannot be used outside React; read from localStorage directly
    const raw = localStorage.getItem('auth');
    const auth = raw ? JSON.parse(raw) : null;
    const token = auth?.token || useAuthStore.getState?.()?.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

export default api;
