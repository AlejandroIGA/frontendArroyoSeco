import apiClient from "../../axiosConfig";

const userService = {
    "update": async (data) => {
        try {
            const response = await apiClient.put(`/user-profiles/profile`, data); 
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    "getProfile": async () => {
        try {
            const response = await apiClient.get(`/user-profiles/profile`); 
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default userService;