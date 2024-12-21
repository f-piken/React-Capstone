import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL API Laravel kamu
=======
  baseURL: 'http://localhost:8000/api',
>>>>>>> 1c5ee2c1 (auth-chat)
});

api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => Promise.reject(error)
);

export default api;
