import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../getTasks&Actions";
import { addTask, updateTask, deleteTask } from "./taskQueriesApis";
import toast from "react-hot-toast";
// import { updateTask } from "./taskQueriesApis";
// import { deleteTask } from "./taskQueriesApis";
import Cookies from "js-cookie";
import axios from "axios";

export const useTaskStatuses = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  return useQuery({
    queryKey: ["taskStatuses"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/api/task-statuses`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      return response.data.statuses;
    },
    // You can add staleTime if needed
    // staleTime: 60 * 1000 // 1 minute
  });
};
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
