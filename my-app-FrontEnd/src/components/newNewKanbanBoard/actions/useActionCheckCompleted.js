import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Function to fetch non-completed actions for a client
async function getNonCompletedAction(clientID) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await axios.get(
      `${apiUrl}/api/actions/actionsNotcompletedOfClient/${clientID}`, // Fixed URL with trailing slash
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    return response.data; // Expecting an array or object based on API response
  } catch (error) {
    // Enhanced error handling
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error in Check Completed";
    throw new Error(errorMessage);
  }
}

// React Query hook to fetch non-completed actions
export function useCheckAction(clientID) {
  const {
    data: nonCompletedActions, // Renamed for clarity
    isLoading: isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["checked", clientID],
    queryFn: () => getNonCompletedAction(clientID),
    enabled: !!clientID,
    onError: (err) => {
      console.error(
        "Error fetching Non Completed Actions",
        err.response || err.message
      );
    },
  });

  return {
    nonCompletedActions,
    isPending,
    isError,
    error,
  };
}
