export async function getSalesAgent() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/get-sales-agents-details/agents"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.agents);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
