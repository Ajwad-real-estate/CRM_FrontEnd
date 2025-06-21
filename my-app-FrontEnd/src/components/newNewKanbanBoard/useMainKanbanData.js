import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie"; // Import Cookies

const fetchClients = async (sublink) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const response = await fetch(
    `${apiUrl}/api/clients/getClient?status=${sublink}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }
  return response.json();
};

const useClients = (currentSublink) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["clientsList", currentSublink], // Include sublink in queryKey for caching
    queryFn: () => fetchClients(currentSublink),
  });

  return { data, error, isPending, isError };
};

export default useClients;
