import apiClient from "../../axiosConfig";

const authService = {
    "login": async (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response;
        } catch (error) {
            throw error;
        }
    },

    "logout": () => {
        sessionStorage.removeItem('token');
    },

    "isAuthenticated": () => {
        return !!sessionStorage.getItem('token');
    },

    "getToken": () => {
        return sessionStorage.getItem('token');
    },

    "register": async (data) => {
        try {
            const response = await apiClient.post('/user/register', data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    "reset": async (email) => {
        try {
            const response = await apiClient.post("/user/reset", { email });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    "verifyResetCode": async (email, code) => {
        try {
            const response = await apiClient.post("/user/verify-code", { email, code });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    "resetPassword": async (email, code, newPassword) => {
        try {
            const response = await apiClient.post("/user/reset-password", { 
                email, 
                code, 
                newPassword 
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }
}

export default authService;
