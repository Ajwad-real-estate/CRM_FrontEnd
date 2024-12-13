export async function getSalesAgent() {
  try {
    const response = await fetch(`localhost:3000/api/get-sales-agents-details`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
