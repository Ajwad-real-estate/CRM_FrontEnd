import Cookies from "js-cookie";

export async function getTasks() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  try {
    const response = await fetch(apiUrl + "/api/tasks/", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("data" + data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
