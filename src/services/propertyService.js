import apiClient from "../../axiosConfig";

const propertyService = {
    "getAll": async () => {
        const response = await apiClient.get('/properties');
        return response;
    },
    "searchProperties": async (searchParams) => {
        const response = await apiClient.get('/properties/search', {
            params: searchParams
        });
        return response;
    }

}

export default propertyService;
