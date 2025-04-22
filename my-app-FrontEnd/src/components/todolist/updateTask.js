import Cookies from "js-cookie";

export async function updateTask(taskId, taskData) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
      method: "PUT", // Change to PUT for updating
      headers: {
        "Content-Type": "application/json", // Specify the request body format
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(taskData), // Send the updated task data as JSON
    });

    if (!response.ok) {
      console.error(`Failed to update task. Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedTask = await response.json(); // Parse the updated task data
    return updatedTask; // Return the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // Rethrow the error to let the mutation handle it
  }
}
