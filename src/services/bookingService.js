import apiClient from "../../axiosConfig";

const bookingService = {
    "getAll": async () => {
        const response = await apiClient.get('/bookings');
        return response;
    },
    "register": async () => {
        
    }
}

export default bookingService;