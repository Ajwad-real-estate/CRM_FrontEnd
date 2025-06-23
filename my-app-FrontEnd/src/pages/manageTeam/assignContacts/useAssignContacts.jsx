import { useState } from "react";
import teamOfSalesApi from "../../../api/teamOfSalesApis";
import clientsApi from "../../../api/clientsApis";

export const useAssignContacts = () => {
  const [clients, setClients] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUnassignedClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientsApi.getUnassignedClients();
      setClients(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching unassigned clients:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teamOfSalesApi.getSalesAgents();
      const formattedAgents = data.agents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        quantity: 0,
      }));
      setAgents(formattedAgents);
    } catch (err) {
      setError(err);
      console.error("Error fetching sales agents:", err);
    } finally {
      setLoading(false);
    }
  };

  const assignClientsToAgents = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      await clientsApi.assignClients(payload);
      return true;
    } catch (err) {
      setError(err);
      console.error("Error assigning clients:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    agents,
    loading,
    error,
    fetchUnassignedClients,
    fetchSalesAgents,
    assignClientsToAgents,
    setAgents,
  };
};
