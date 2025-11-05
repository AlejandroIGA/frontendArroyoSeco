import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://146.190.115.150/api',

    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
});

/* CONFIGURACIÓN PARA MANDAR TOKEN EN CADA PETICIÓN
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
*/

export default apiClient;