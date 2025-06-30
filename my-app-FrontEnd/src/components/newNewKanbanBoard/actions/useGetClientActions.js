import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Function to fetch actions history for a client
async function getActionsByClient(clientID) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await axios.get(
      `${apiUrl}/api/actions/actionsHistoryOfClient/${clientID}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Enhanced error handling
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch client actions";
    throw new Error(errorMessage);
  }
}

// React Query hook to fetch client actions
export function useClientActions(clientID) {
  const {
    data,
    isLoading: isPending, // Aliased for better semantics
    isError,
    error,
  } = useQuery({
    queryKey: ["clientActions", clientID],
    queryFn: () => getActionsByClient(clientID),
    enabled: !!clientID,
    onError: (err) => {
      console.error("Error fetching client actions:", err.message);
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
