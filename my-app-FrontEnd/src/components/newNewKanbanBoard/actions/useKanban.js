import { useQuery } from "@tanstack/react-query";
import { getAllClients, getClient, getClientsByIds } from "./apiKanbanStuff";

export function useClient(clientID) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["client", clientID],
    queryFn: () => getClient(clientID),
    enabled: !!clientID,
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
}


export function useAllClients() {
  return useQuery({
    queryKey: ["all-clients"],
    queryFn: getAllClients,
    staleTime: 5 * 60 * 1000,
    select: (data) => new Map(data.map((client) => [client.id, client])),
  });
}

export function useActionClients(actionClientIds) {
  return useQuery({
    queryKey: ["action-clients", actionClientIds],
    queryFn: () => getClientsByIds(actionClientIds),
    enabled: actionClientIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    select: (data) => new Map(data.map(client => [client.id, client]))
  });
}