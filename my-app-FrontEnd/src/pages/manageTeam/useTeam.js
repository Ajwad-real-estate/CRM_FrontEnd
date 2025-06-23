// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import teamOfSalesApi from "../../api/teamOfSalesApis";

// export function useTeam() {
//   const queryClient = useQueryClient();

//   // Fetching the sales team data
//   const { data, error, isPending, isError } = useQuery({
//     queryKey: ["salesTeam"],
//     queryFn: () => teamOfSalesApi.getSalesAgents(), // Call the specific API function
//     staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
//     cacheTime: 1000 * 60 * 30, // Cached data stays for 30 minutes
//     refetchOnWindowFocus: false, // Avoid refetching when tab gains focus
//     select: (response) => response.agents, // Extract the agents array
//   });
//   // console.log("Sales Team Data:", data.agents);
//   console.log("Sales Team Data:", data);

//   // Function to refetch manually
//   const refetchTeam = () => {
//     queryClient.invalidateQueries(["salesTeam"]); // Invalidates the cache and triggers a refetch
//   };

//   return { isPending, agents: data || [], error, isError, refetchTeam };
// }
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import teamOfSalesApi from "../../api/teamOfSalesApis";

export function useTeam() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch all sales agents
  const {
    data: agents,
    error: agentsError,
    isLoading: isLoadingAgents,
    isError: isAgentsError,
  } = useQuery({
    queryKey: ["salesAgents"],
    queryFn: () => teamOfSalesApi.getSalesAgents(),
    select: (data) => data.agents || [],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch single agent details
  const useAgentDetails = (id) => {
    return useQuery({
      queryKey: ["agentDetails", id],
      queryFn: () => teamOfSalesApi.getAgentDetails(id),
      select: (data) => data || {}, // Ensure we always get an object
      enabled: !!id, // Only fetch if id exists
    });
  };

  // Update agent details mutation
  const updateAgentDetails = useMutation({
    mutationFn: ({ id, payload }) =>
      teamOfSalesApi.updateAgentDetails(id, payload),
    onSuccess: () => {
      enqueueSnackbar("Agent details updated successfully!", {
        variant: "success",
      });
      queryClient.invalidateQueries(["agentDetails"]);
      queryClient.invalidateQueries(["salesAgents"]);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Failed to update agent details", {
        variant: "error",
      });
    },
  });

  // Update agent email mutation
  const updateAgentEmail = useMutation({
    mutationFn: ({ id, newEmail }) =>
      teamOfSalesApi.updateAgentEmail(id, newEmail),
    onSuccess: () => {
      enqueueSnackbar("Email updated successfully!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Failed to update email", {
        variant: "error",
      });
    },
  });

  // Update agent password mutation
  const updateAgentPassword = useMutation({
    mutationFn: ({ id, newPassword }) =>
      teamOfSalesApi.updateAgentPassword(id, newPassword),
    onSuccess: () => {
      enqueueSnackbar("Password updated successfully!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Failed to update password", {
        variant: "error",
      });
    },
  });

  // Refetch all team data
  const refetchAll = () => {
    queryClient.invalidateQueries(["salesAgents"]);
    // queryClient.invalidateQueries(["roles"]);
    // queryClient.invalidateQueries(["statuses"]);
  };

  return {
    // Queries
    agents,
    isLoadingAgents,
    isAgentsError,
    agentsError,

    useAgentDetails,

    // Mutations
    updateAgentDetails,
    updateAgentEmail,
    updateAgentPassword,

    // Utilities
    refetchAll,
  };
}
