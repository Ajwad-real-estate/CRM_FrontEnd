import Cookies from "js-cookie";

export async function getSalesAgent() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const response = await fetch(apiUrl + "/api/get-sales-agents-details", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.agents);

  return data;
}
