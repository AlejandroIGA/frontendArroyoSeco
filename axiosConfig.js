import axios from 'axios';
import { Capacitor } from '@capacitor/core';

export const CLIENT_ID = 'srta';

// Detectar si estamos en móvil o web
const isNativePlatform = Capacitor.isNativePlatform();

// URLs diferentes según la plataforma
export const REDIRECT_URI = isNativePlatform 
  ? 'alojando://callback'  // Deep link para móvil
  : 'https://alojando.duckdns.org/callback';  // URL web

export const AUTHORIZE = 'https://alojando.duckdns.org/oauth2/authorize'; 

const apiClient = axios.create({
    baseURL: 'https://alojando.duckdns.org/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
    withCredentials: !isNativePlatform, // Solo en web
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