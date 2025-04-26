import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const accessToken = Cookies.get("accessToken");

export async function getClient(clientID) {
  try {
    const response = await fetch(apiUrl + `/api/clients/${clientID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function updateClient(clientID, clientData) {
  try {
    const response = await fetch(apiUrl + `/api/clients/${clientID}`, {
      method: "PUT", // or "PATCH" depending on your use case
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(clientData), // clientData will contain the updated client information
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error updating client data:", error);
  }
}

export async function getAllClients() {
  try {
    const response = await fetch(apiUrl + "/api/clients", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all clients:", error);
    throw error; // Rethrow to let React Query handle the error
  }
}
export async function getClientsByIds(clientIds) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(
      apiUrl + `/api/clients?ids=${clientIds.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}
