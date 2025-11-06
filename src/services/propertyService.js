import apiClient from "../../axiosConfig";

const propertyService = {
    "getAll": async () => {
        try{
            const response = await apiClient.get('/properties');
            return response;
        }catch(error){
            throw error;
        }
        
    },
    "searchProperties": async (searchParams) => {
        try{
            const response = await apiClient.get('/properties/search', {
                params: searchParams
            });
            return response;
        }catch(error){
            throw error;
        }
    },
    "save": async (data) => {
        try{
            const response = await apiClient.post('/properties/register', data);
            return response;
        }catch (error){
            throw error;
        }
        
    },
    "getMyProperties": async () => {
        try{
            const response = await apiClient.get(`/properties/user/myproperties`);
            return response;
        }catch (error){
            throw error;
        }
    },
    "getById": async(id) => {
        try{
            const response = await apiClient.get(`/properties/${id}`);
            return response;
        }catch(error){
            throw error;
        }
    },
    "update": async(id,data) => {
        try{
            const response = await apiClient.put(`/properties/update/${id}`,data);
            return response;
        }catch(error){
            throw error;
        }
    },
    "delete": async(id) => {
        try{
            const response = await apiClient.delete(`/properties/delete/${id}`);
            return response;
        }catch(error){
            throw error;
        }
    }

}

export default propertyService;
