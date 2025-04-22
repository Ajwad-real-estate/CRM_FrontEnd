import Cookies from "js-cookie";

export async function deleteTask(taskId) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to delete task. Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Rethrow the error to let the mutation handle it
  }
}
