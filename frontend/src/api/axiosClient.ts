import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://localhost:5122/api', // Твоя API адреса
  headers: {
    'Content-Type': 'application/json',
  },
});

// Тут можна додати інтерцептори для токенів в майбутньому
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;