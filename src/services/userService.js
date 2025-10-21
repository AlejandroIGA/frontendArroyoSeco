import apiClient  from "../../axiosConfig";

const userService = {
    "update" : async (data) => {
        try {
            const response = await apiClient.put('/user/profile', data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default userService;