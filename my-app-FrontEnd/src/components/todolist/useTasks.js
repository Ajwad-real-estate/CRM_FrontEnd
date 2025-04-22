import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "./aptTasks";
import { addTask } from "./addTask";
import toast from "react-hot-toast";

export function useTasks() {
  // Query for fetching tasks
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return {
    data, // The fetched tasks
    isPending, // Whether the query is loading
    isError, // Whether an error occurred
    error, // The error object if any
  };
}

export function useAddTasks() {
  const queryClient = useQueryClient();
  const { mutate: addTaskTod, isPending: isCreating } = useMutation({
    mutationFn: (newTask) => addTask(newTask), // Pass the argument to addTask
    onSuccess: () => {
      toast.success("Task Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addTaskTod };
}
