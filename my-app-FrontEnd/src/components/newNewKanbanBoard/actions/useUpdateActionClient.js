import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

// API function to update an action
async function updateAction(actionData, actionId) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  console.log("Access Token:", Cookies.get("accessToken"));

  // Validate required fields
  if (!actionId || !actionData.type_id || !actionData.client_id) {
    throw new Error("Missing required fields: actionId, type_id");
  }
  console.log(actionData);
  console.log(actionData.location);
  console.log(actionData.unit_id);
  console.log(actionData.project_id);
  // Create the payload with required and optional fields
  const payload = {
    type_id: actionData.type_id,
    comment: actionData.comment || null,
    // Optional fields
    completed: actionData.completed || false,
    answered: actionData.answered || null,
    date: actionData.date,
    time: actionData.time,
    location: actionData.location,
    status_id: actionData.status_id || null,
    unit_id: actionData.unit_id || null,
    project_id: actionData.project_id || null,
  };

  try {
    const response = await axios.put(
      `${apiUrl}/api/actions/${actionId}`,
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
      error.response?.data?.message || "Failed to update action";
    throw new Error(errorMessage);
  }
}

// Hook to use the updateAction API
export function useUpdateActions(clientID) {
  const queryClient = useQueryClient();

  const { mutate: updateActionContent, isPending: isUpdating } = useMutation({
    mutationFn: ({ actionData, actionId }) =>
      updateAction(actionData, actionId), // Passing both parameters
    onSuccess: () => {
      toast.success("Action Updated Successfully");

      // List of query keys to invalidate
      const queriesToInvalidate = [
        ["clientActions", clientID],
        ["checked", clientID],
      ];

      // Invalidate each query
      queriesToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateActionContent };
}
