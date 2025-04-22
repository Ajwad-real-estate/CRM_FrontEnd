import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "./deleteTask";
import toast from "react-hot-toast";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate: deleteTaskById, isPending: isDeleting } = useMutation({
    mutationFn: (taskId) => deleteTask(taskId), // Pass the task ID to deleteTask
    onSuccess: () => {
      toast.success("Task Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["tasks"], // Refetch tasks to update the list
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTaskById };
}
