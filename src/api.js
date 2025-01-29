import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Ambil role dari localStorage

    // Tambahkan token ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Tambahkan role ke header (opsional, jika backend memerlukan)
    if (role) {
      config.headers.Role = role;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, // Tetap lanjutkan jika respons berhasil
  (error) => {
    if (error.response && error.response.status === 401) {
      // Hapus token dan role dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      // Arahkan pengguna ke halaman login
      window.location.href = '/login'; // Atau gunakan navigate() jika menggunakan React Router
    }
    return Promise.reject(error);
  }
);

export default api;
