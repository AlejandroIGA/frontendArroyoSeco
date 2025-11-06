import axios from 'axios';

export const CLIENT_ID = 'srta';
export const REDIRECT_URI = 'http://localhost:5173/callback';
export const AUTHORIZE = 'http://localhost:8080/oauth2/authorize'; 


const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://alojando.duckdns.org/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
    withCredentials: true, 
});

// Mandar token en cada petición
apiClient.interceptors.request.use(
    (config) => {
        // Lista de urls que no necesitan token
        const publicEndpoints = [
            '/auth/login',
            '/auth/exchange-code',
            '/user/register',
            '/user/reset',
            '/user/verify-code',
            '/user/reset-password'
        ];
        
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url?.includes(endpoint)
        );
        
        // Solo agregar token si no es un endpoint público
        if (!isPublicEndpoint) {
            const token = localStorage.getItem('token'); 
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

export default apiClient;