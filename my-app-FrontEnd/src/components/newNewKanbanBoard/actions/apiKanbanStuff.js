import Cookies from "js-cookie";

export async function getClient(clientID) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(apiUrl + `/api/clients/${clientID}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function updateClient(clientID, clientData) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(apiUrl + `/api/clients/${clientID}`, {
      method: "PUT", // or "PATCH" depending on your use case
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(clientData), // clientData will contain the updated client information
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data; // Return the updated client data
  } catch (error) {
    console.error("Error updating client data:", error);
  }
}
