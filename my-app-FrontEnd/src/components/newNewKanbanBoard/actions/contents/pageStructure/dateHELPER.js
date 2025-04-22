export function processDate(inputDate) {
  const inputDateObj = new Date(inputDate);

  const date = new Date(inputDateObj);
  date.setUTCDate(date.getUTCDate() + 4);
  const formattedDate = date.toISOString();

  let hours = inputDateObj.getHours().toString().padStart(2, "0");
  let minutes = inputDateObj.getMinutes().toString().padStart(2, "0");
  let seconds = inputDateObj.getSeconds().toString().padStart(2, "0");

  if (seconds === "00") {
    seconds = "01";
  }

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
/**
 * Converts a given date and time into "YYYY-MM-DDTHH:mm" format.
 * @param {string} date - The date string in ISO format (e.g., "2024-12-29T22:00:00.000Z").
 * @param {string} time - The time string in "HH:mm:ss" format (e.g., "23:22:01").
 * @returns {string} - Combined datetime in "YYYY-MM-DDTHH:mm" format.
 */
export function convertToDateTimeLocalFormat(date, time) {
  if (!date || !time) return ""; // Return empty string if inputs are invalid

  // Extract the date part from the ISO date
  const formattedDate = new Date(date).toISOString().slice(0, 10); // "YYYY-MM-DD"

  // Extract hours and minutes from the time string
  const [hours, minutes] = time.split(":");

  // Combine into the required format
  return `${formattedDate}T${hours}:${minutes}`;
}
export function addHoursToDateTime(dateTime, hoursToAdd) {
  // Parse the input date-time string into a JavaScript Date object
  const date = new Date(dateTime);

  // Add the specified number of hours
  date.setHours(date.getHours() + hoursToAdd);

  // Format the updated date back to the same format as input
  const updatedDateTime = date.toISOString().slice(0, 16);

  return updatedDateTime;
}

// Example usage
const initialDateTime = "2024-12-20T23:22";
const hoursToAdd = 5;
const result = addHoursToDateTime(initialDateTime, hoursToAdd);
console.log(result); // Example: "2024-12-21T04:22"
