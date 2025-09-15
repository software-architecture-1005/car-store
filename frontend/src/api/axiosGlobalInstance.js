import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/car-store/api/v1/';

const axiosGlobalInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token if present
axiosGlobalInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    console.log('Axios request interceptor - Token found:', !!token);
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers.Authorization.substring(0, 20) + '...');
    } else {
        console.log('No token found in localStorage');
    }
    return config;
});

export default axiosGlobalInstance;