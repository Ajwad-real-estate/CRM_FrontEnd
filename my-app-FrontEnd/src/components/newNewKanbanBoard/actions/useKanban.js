import { useQuery } from "@tanstack/react-query";
import { getClient } from "./apiKanbanStuff";

export function useClient(clientID) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["client", clientID],
    queryFn: () => getClient(clientID),
    enabled: !!clientID, // Ensure the query runs only if clientID is provided
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}
