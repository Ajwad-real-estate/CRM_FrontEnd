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
