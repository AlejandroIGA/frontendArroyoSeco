import axios from 'axios';

export const CLIENT_ID = 'srta';
export const REDIRECT_URI = 'https://alojando.duckdns.org/callback';
export const AUTHORIZE = 'https://alojando.duckdns.org/oauth2/authorize'; 


const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://alojando.duckdns.org/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 25000, 
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
        if (!isPublicEndpoint && sessionStorage.getItem('isSessionActive')) {
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

export default apiClient;