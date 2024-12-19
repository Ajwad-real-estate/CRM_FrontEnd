import Cookies from "js-cookie";

export async function addTask(task) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(apiUrl + "/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      console.error(`Failed to add task. Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // Rethrow the error to let the mutation handle it
  }
}
