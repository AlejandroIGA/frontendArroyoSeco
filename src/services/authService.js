import apiClient from "../../axiosConfig";

const authService = {
    "login" : async (credentials) => {
    try {
        const response = await apiClient.post('/user/login', credentials);
        return response;
    } catch (error) {
        throw error;
    }
}
}

export default authService;