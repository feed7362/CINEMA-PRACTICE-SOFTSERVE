import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5122/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosClient.interceptors.request.use((config) => {
//   const token = Cookies.get('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosClient;