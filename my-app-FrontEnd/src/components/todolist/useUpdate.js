import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "./updateTask";
import toast from "react-hot-toast";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate: updateTaskById, isPending: isUpdating } = useMutation({
    mutationFn: ({ taskId, taskData }) => updateTask(taskId, taskData),
    onSuccess: () => {
      toast.success("Task Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refetch tasks
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateTaskById };
}
