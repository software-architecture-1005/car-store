import axios from 'axios';

// Base URL unificada para toda la aplicación
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/car-store/';

const axiosGlobalInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adjuntar el token JWT
axiosGlobalInstance.interceptors.request.use((config) => {
    // Unificamos el nombre de la clave del token a 'accessToken'
    const token = localStorage.getItem('accessToken');
    
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar errores globales (opcional, pero recomendado)
axiosGlobalInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Aquí podrías manejar errores 401 (token expirado) globalmente
        if (error.response && error.response.status === 401) {
            // Opcional: Redirigir a login o intentar refresh token
            console.warn('Sesión expirada o no autorizada');
        }
        return Promise.reject(error);
    }
);

export default axiosGlobalInstance;