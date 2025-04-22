import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
import Cookies from "js-cookie";

export const createBulkClients = async (clientsData) => {
    try {
        const response = await axios.post(apiUrl + '/api/clients/bulk',
            {
                clients: clientsData,
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                }
            }
        );
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Error creating clients',
            details: error.response?.data
        };
    }
};
