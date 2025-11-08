import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://alojando.duckdns.org/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 25000, 
    withCredentials: true, 
});

// Interceptor para agregar el token JWT a las peticiones
apiClient.interceptors.request.use(
    (config) => {
        // Lista de URLs públicas que NO necesitan token
        const publicEndpoints = [
            '/auth/login',
            '/user/register',
            '/user/reset',
            '/user/verify-code',
            '/user/reset-password',
        ];
        
        // Verificar si la URL actual es un endpoint público
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url?.includes(endpoint)
        );
        // Solo agregar token si NO es un endpoint público
        if (!isPublicEndpoint) {
            const token = sessionStorage.getItem('token'); 
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            sessionStorage.removeItem('token');
            sessionStorage.removeItem("isSessionActive");
            sessionStorage.removeItem("userRole")
            // Redirigir al login si no estamos ya ahí
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
