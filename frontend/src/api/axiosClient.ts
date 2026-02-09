import axios from 'axios';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL as string,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      
			console.warn('Токен недійсний або прострочений. Вихід...');
      
			localStorage.removeItem('token');
      
			window.location.href = '/auth'; 
		}
		return Promise.reject(error);
	},
);

export default axiosClient;