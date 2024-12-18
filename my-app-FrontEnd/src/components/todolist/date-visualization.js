import { format, parseISO } from "date-fns";

export default function formatTaskDates(task) {
  const formattedCreatedAt = format(
    parseISO(task.created_at),
    "yyyy-MM-dd HH:mm:ss"
  );
  const formattedUpdatedAt = format(
    parseISO(task.updated_at),
    "yyyy-MM-dd HH:mm:ss"
  );
  const formattedDate = format(parseISO(task.date), "yyyy-MM-dd");
  const formattedTime = task.time ? task.time.split(".")[0] : "N/A"; // Handle null or missing time

  return {
    ...task,
    created_at: formattedCreatedAt,
    updated_at: formattedUpdatedAt,
    date: formattedDate,
    time: formattedTime,
  };
}
