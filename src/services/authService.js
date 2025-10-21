import apiClient from "../../axiosConfig";

const authService = {
    "login" : async (credentials) => {
    try {
        const response = await apiClient.post('/user/login', credentials);
        return response;
    } catch (error) {
        throw error;
    }
},
    "register" : async (data) => {
        try{
            const response = await apiClient.post('/user/register', data);
            return response;
        }catch(error){
            throw error;
        }
    },
    "getProfile": async () => {
        try {
            const response = await apiClient.get('/user/profile'); 
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default authService;