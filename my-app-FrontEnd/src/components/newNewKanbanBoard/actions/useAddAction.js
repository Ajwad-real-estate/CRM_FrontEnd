import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

async function addAction(actionData) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Validate required fields
  if (!actionData.client_id || !actionData.type_id) {
    throw new Error("Missing required fields: client_id, type_id,");
  }
  console.log(actionData);
  // Create the payload with required and optional fields
  const payload = {
    client_id: actionData.client_id,
    type_id: actionData.type_id,
    comment: actionData.comment,
    // Optional fields
    completed: actionData.completed || false,
    answered: actionData.answered || null,
    date: actionData.date,
    time: actionData.time,
    location: actionData.location || null,
    status_id: actionData.status_id,
    project_id: actionData.project_id || null,
    unit_id: actionData.unit_id || null,
  };
  console.log("payload");
  console.log(payload);
  try {
    const response = await axios.post(`${apiUrl}/api/actions`, payload, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    // Enhanced error handling
    const errorMessage =
      error.response?.data?.message || "Failed to add action";
    throw new Error(errorMessage);
  }
}

export function useAddActions(clientID) {
  const queryClient = useQueryClient();

  const { mutate: addActionContent, isPending: isAdding } = useMutation({
    mutationFn: addAction, // Assuming addAction is already defined
    onSuccess: () => {
      toast.success("Action Added Successfully");

      // Invalidate the query for client actions to trigger refetch
      queryClient.invalidateQueries({
        queryKey: ["clientActions", clientID],
      });
      queryClient.invalidateQueries({
        queryKey: ["checked", clientID],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isAdding, addActionContent };
}
