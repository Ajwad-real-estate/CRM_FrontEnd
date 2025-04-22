import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { EditAction } from "./apiActions";

export function useUpdateAction() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ actionID, actionData }) => EditAction(actionID, actionData),
    onSuccess: (data) => {
      toast.success("Action updated successfully!");
      queryClient.invalidateQueries(["action", data.id]);
      queryClient.invalidateQueries(["actions"]); // Invalidate the broader "actions" query
    },
    onError: (error) => {
      toast.error(`Error updating action: ${error.message}`);
    },
  });

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    editAction: mutation.mutate,
  };
}
