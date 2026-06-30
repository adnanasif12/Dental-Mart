const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.MODE === 'development'
    ? '/api'
    : 'https://dental-mart-backend.vercel.app/api');

export default API_BASE_URL;
