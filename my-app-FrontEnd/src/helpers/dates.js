import { parse } from "date-fns";

export function checkTaskDateValidation(
  startDate,
  startTime,
  endDate,
  endTime
) {
  // Concatenate date and time strings with 'T' separator to make them ISO-compatible
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${endDate}T${endTime}`);
  const now = new Date(); // Current date and time

  // Check if startDateTime is in the past
  if (startDateTime < now) {
    return false;
  }

  // Check if endDateTime is after or equal to startDateTime
  return endDateTime >= startDateTime;
}

export function RemainingTime(date, time) {
  // Parse the date and time into a Date object
  const targetDateTime = parse(
    `${date} ${time}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  // Get the current date and time
  const now = new Date();

  // Check if the parsed date is valid
  if (isNaN(targetDateTime)) {
    console.error("Invalid date format provided");
    return null;
  }

  // Calculate the difference in milliseconds (Unix timestamp format)
  const differenceInMillis = targetDateTime.getTime() - now.getTime();

  return differenceInMillis;
}
