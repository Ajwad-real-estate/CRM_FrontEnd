import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

async function addAction(actionData) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Validate required fields
  if (!actionData.client_id || !actionData.type_id || !actionData.comment) {
    throw new Error("Missing required fields: client_id, type_id, and comment are required");
  }

  // Create the payload with required and optional fields
  const payload = {
    client_id: actionData.client_id,
    type_id: actionData.type_id,
    comment: actionData.comment,
    // Optional fields
    completed: actionData.completed || false,
    answered: actionData.answered || false,
    date: actionData.date,
    time: actionData.time,
    location: actionData.location,
    status_id: actionData.status_id
  };
console.log("payload")
console.log(payload)
  try {
    const response = await axios.post(`${apiUrl}/api/actions`, payload, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    // Enhanced error handling
    const errorMessage = error.response?.data?.message || "Failed to add action";
    throw new Error(errorMessage);
  }
}

export function useAddActions() {
  const queryClient = useQueryClient();

  const { mutate: addActionContent, isPending: isAdding } = useMutation({
    mutationFn: addAction,
    onSuccess: () => {
      toast.success("Action Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["actions"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isAdding, addActionContent };
}
