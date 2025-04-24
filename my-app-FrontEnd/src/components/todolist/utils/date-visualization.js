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
