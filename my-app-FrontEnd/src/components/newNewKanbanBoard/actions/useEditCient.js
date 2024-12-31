import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

// API function to update a client
async function updateClient(clientData, clientId) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  console.log("Access Token:", Cookies.get("accessToken"));

  if (!clientId || !clientData.name || !clientData.email) {
    throw new Error("Missing required fields , name , age , email");
  }
  console.log(clientData);

  // Create the payload with required and optional fields
  const payload = {
    name: clientData.name,
    age: clientData.age || null,
    email: clientData.email,
    status_id: clientData.status_id || null,
    type_id: clientData.type_id || null,
    channel_id: clientData.channel_id || null,
    nat_id: clientData.nat_id || null,
    budget: clientData.budget || null,
    street: clientData.street || null,
    phone_numbers: clientData.phone_numbers || null,
  };

  try {
    const response = await axios.put(
      `${apiUrl}/api/clients/${clientId}`,
      payload,
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
      error.response?.data?.message || "Failed to update client";
    throw new Error(errorMessage);
  }
}

// Hook to use the updateClient API
export function useUpdateClient(clientID) {
  const queryClient = useQueryClient();

  const { mutate: updateClientData, isPending: isUpdating } = useMutation({
    mutationFn: ({ clientData, clientId }) =>
      updateClient(clientData, clientId), // Passing both parameters
    onSuccess: () => {
      toast.success("Client Updated Successfully");

      // List of query keys to invalidate
      const queriesToInvalidate = [["client", clientID]];

      // Invalidate each query
      queriesToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateClientData };
}
