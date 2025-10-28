import apiClient  from "../../axiosConfig";

const userService = {
    "update" : async (data) => {
        try {
            const response = await apiClient.put(`/user-profiles/${localStorage.getItem('userId')}/profile`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    "getProfile": async () => {
        try {
            //por el momento se va a obtener con base al id del usuario, esto debe modificarse por seguridad
            const response = await apiClient.get(`/user-profiles/${localStorage.getItem('userId')}/profile`); 
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default userService;