import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getKanbanData } from "./getKanbanData";

export function useGetKanban() {
  const {
    data: lead, // Rename data to lead
    isPending,
    isError,
    errorContent,
  } = useQuery({
    queryKey: ["kanban"],
    queryFn: getKanbanData,
  });

  return {
    lead, // Return the renamed variable
    isPending,
    isError,
    errorContent,
  };
}
