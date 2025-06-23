import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const teamOfSalesApi = {
  // Get all sales agents
  getSalesAgents: async () => {
    try {
      const response = await axios.get(
        // `${apiUrl}/api/get-sales-agents-details`,
        `${apiUrl}/api/salesAgent/sales-agents`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      console.log("Sales Agents Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching sales agents:", error);
      throw error;
    }
  },

  // Get single agent details
  getAgentDetails: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/salesAgent/user/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      console.log(`Agent Details for ID ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching agent with ID ${id}:`, error);
      throw error;
    }
  },

  // Update agent details
  updateAgentDetails: async (id, payload) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/agentDetails/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating agent with ID ${id}:`, error);
      throw error;
    }
  },

  // Update agent email
  updateAgentEmail: async (id, newEmail) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/regmailbyid/${id}`,
        { newEmail },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating email for agent with ID ${id}:`, error);
      throw error;
    }
  },

  // Update agent password
  updateAgentPassword: async (id, newPassword) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/repassbyid/${id}`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating password for agent with ID ${id}:`, error);
      throw error;
    }
  },
};

export default teamOfSalesApi;
