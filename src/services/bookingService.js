import apiClient from "../../axiosConfig";

const bookingService = {
    "getAll": async () => {
        const response = await apiClient.get('/bookings');
        return response;
    },
    "registerBooking": async (bookingData) => {
        const response = await apiClient.post('/bookings', bookingData);
        return response;
    },
    "updateBooking": async (id, requestDTO) => {
        const response = await apiClient.put(`/bookings/${id}`, requestDTO);
        return response;
    },
    "searchBookings": async (searchParams) => {
        const response = await apiClient.get('/bookings/search', {
            params: searchParams
        });
        return response;
    },
     "getMyBookings": async () => {
        const response = await apiClient.get('/bookings/me');
        return response;
    },
    

}

export default bookingService;