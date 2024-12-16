
const date = new Date();

// Format: YYYY-MM-DD
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

const todayDate = `${year}-${month}-${day}`;
// console.log(todayDate);

export { todayDate };
