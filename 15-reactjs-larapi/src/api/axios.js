import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // URL base de la API
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Este es el "interuptor" es como un guardia 
// que inyecta el token de autorizacion automáticamente.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interuptor para comprobar que el token si sea correcto
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Obtenemos la URL de la petición que falló
        const originalRequestUrl = error.config.url;

        // Si el error es desde localstorage ejecutar esto
        if (error.response && error.response.status === 401 && !originalRequestUrl.includes('/login')) {
            localStorage.removeItem('authToken');
            window.location.href = '/';
        }

        // Si es login y falla (401), dejamos que el error pase al 'catch' de handleLogin
        // para validacion
        return Promise.reject(error);
    }
);

export default api;