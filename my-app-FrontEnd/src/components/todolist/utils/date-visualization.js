import { format, parseISO } from "date-fns";

export default function formatTaskDates(task) {
  if (!task) {
    throw new Error("Task object is required");
  }

  const formattedCreatedAt = task.created_at
    ? format(parseISO(task.created_at), "yyyy-MM-dd HH:mm:ss")
    : "";

  const formattedUpdatedAt = task.updated_at
    ? format(parseISO(task.updated_at), "yyyy-MM-dd HH:mm:ss")
    : "";

  const formattedDate = task.date
    ? format(parseISO(task.date), "yyyy-MM-dd")
    : "";

  const formattedTime = task.time
    ? task.time.split(".")[0] // Extract time before the fractional part
    : ""; // Default to "N/A" if time is null or undefined

  return {
    ...task,
    created_at: formattedCreatedAt,
    updated_at: formattedUpdatedAt,
    date: formattedDate,
    time: formattedTime,
  };
}
export function formatActionDates(action) {
  if (!action) {
    throw new Error("Action object is required");
  }

  // Format timestamps
  const formattedCreatedAt = action.created_at
    ? format(parseISO(action.created_at), "yyyy-MM-dd HH:mm:ss")
    : "";

  const formattedUpdatedAt = action.updated_at
    ? format(parseISO(action.updated_at), "yyyy-MM-dd HH:mm:ss")
    : "";

  // Format action date
  const formattedDate = action.date
    ? format(parseISO(action.date), "yyyy-MM-dd")
    : "";

  // Clean up time format (remove seconds if needed)
  const formattedTime = action.time
    ? action.time.split(":").slice(0, 2).join(":") // Converts "02:45:01" to "02:45"
    : "";

  return {
    ...action,
    created_at: formattedCreatedAt,
    updated_at: formattedUpdatedAt,
    date: formattedDate,
    time: formattedTime,
  };
}
