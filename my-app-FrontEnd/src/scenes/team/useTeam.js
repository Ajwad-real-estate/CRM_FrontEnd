import { useQuery } from "@tanstack/react-query";
import { getSalesAgent } from "./apiStuff";

export function useTeam() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["salesTeam"],
    queryFn: getSalesAgent,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false, // Disable refetch when tab gains focus
  });
  return { isPending, data, error, isError };
}
