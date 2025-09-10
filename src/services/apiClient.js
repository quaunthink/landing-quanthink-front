import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true, // importante para cookies HttpOnly
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
