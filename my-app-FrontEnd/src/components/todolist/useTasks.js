import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./aptTasks";

export function useTasks() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  return { isPending, data, error, isError };
}
