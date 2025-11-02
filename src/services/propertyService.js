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
    },
    "save": async (data) => {
        try{
            const response = await apiClient.post('/properties/register', data);
            return response;
        }catch (error){
            throw error;
        }
        
    }

}

export default propertyService;
