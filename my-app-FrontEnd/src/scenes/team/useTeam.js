import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSalesAgent } from "./apiStuff";

export function useTeam() {
  const queryClient = useQueryClient();

  // Fetching the sales team data
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["salesTeam"],
    queryFn: getSalesAgent,
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cached data stays for 30 minutes
    refetchOnWindowFocus: false, // Avoid refetching when tab gains focus
  });

  // Function to refetch manually
  const refetchTeam = () => {
    queryClient.invalidateQueries(["salesTeam"]); // Invalidates the cache and triggers a refetch
  };

  return { isPending, data, error, isError, refetchTeam };
}
