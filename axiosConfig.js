import axios from 'axios';

const apiClient = axios.create({
    //baseURL: 'https://backendarroyoseco.onrender.com/api',
    baseURL : "http://localhost:8080/api",

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