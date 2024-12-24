import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8000/api',
=======
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL API Laravel kamu
>>>>>>> 5dca85bd (pendaftaran)
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
