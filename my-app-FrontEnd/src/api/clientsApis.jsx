import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${Cookies.get("accessToken")}`,
});

const clientsApi = {
  // Get all clients
  getAllClients: async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/clients/getClient`, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      console.error(
        "❌ Error fetching all clients:",
        err?.response?.data || err.message
      );
      throw err;
    }
  },

  // Get client by ID
  getClientById: async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/api/clients/${id}`, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      console.error(
        `❌ Error fetching client with ID ${id}:`,
        err?.response?.data || err.message
      );
      throw err;
    }
  },

  // Update client by ID
  updateClient: async (id, data) => {
    try {
      const res = await axios.put(`${apiUrl}/api/clients/${id}`, data, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      console.error(
        `❌ Error updating client with ID ${id}:`,
        err?.response?.data || err.message
      );
      throw err;
    }
  },

  // Get unassigned clients
  getUnassignedClients: async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/clients/getClient?assigned=false`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching unassigned clients:", error);
      throw error;
    }
  },

  // Assign clients to agents
  assignClients: async (payload) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/clients/assign`,
        payload,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error assigning clients:", error);
      throw error;
    }
  },

  // Create multiple clients in bulk
  createBulkClients: async (clientsData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/clients/bulk`,
        { clients: clientsData },
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "❌ Error creating bulk clients:",
        error?.response?.data || error.message
      );
      throw {
        success: false,
        error: error.response?.data?.message || "Error creating clients",
        details: error.response?.data,
      };
    }
  },
};

export default clientsApi;
