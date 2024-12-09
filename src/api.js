import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti dengan URL API Laravel kamu
});

export default api;
