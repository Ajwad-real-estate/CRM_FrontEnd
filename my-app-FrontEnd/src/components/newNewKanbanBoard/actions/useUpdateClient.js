import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "./apiKanbanStuff";
import toast from "react-hot-toast";

export function useUpdateClient() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ clientID, clientData }) =>
      updateClient(clientID, clientData),
    onSuccess: (data) => {
      toast.success("Client updated successfully!");
      queryClient.invalidateQueries(["client", data.id]);
    },
    onError: (error) => {
      toast.error(`Error updating client: ${error.message}`);
    },
  });

  return {
    isLoading: mutation.isLoading,
    isSHIT: mutation.isError,
    badError: mutation.error,
    editClient: mutation.mutate,
  };
}
