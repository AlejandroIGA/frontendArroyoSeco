import apiClient from "../../axiosConfig";

const propertyService = {
 "getAll": async () => {
        const response = await apiClient.get('/properties');
        return response;
    }
}

export default propertyService;
