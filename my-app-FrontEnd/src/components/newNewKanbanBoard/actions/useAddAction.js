import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { useState } from "react";
// import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";

// export const useAddAction = () => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [error, setError] = useState(null);

//   const AddAction = async ({ actionData }) => {
//     setIsAdding(true);
//     setError(null);
//     console.log("AddAction");
//     console.log("actionData");
//     console.log(actionData);
//     try {
//       const response = await axios.post(`${apiUrl}/api/actions`, actionData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("accessToken")}`,
//         },
//       });

//       setIsAdding(false);
//       toast.success("Action added Successfully");

//       return response.data;
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to Add action");
//       setIsAdding(false);
//       toast.error(err.message);
//       throw err;
//     }
//   };

//   return {
//     AddAction,
//     isAdding,
//     error,
//   };
// };
import Cookies from "js-cookie";

async function addAction(actionData) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  try {
    const response = await fetch(apiUrl + "/api/actions", {
      method: "POST", // Use POST for adding data
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use the user's token for authorization
      },
      body: JSON.stringify(actionData), // Send the action data as JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response data
    return data; // Return the added action data from the API response
  } catch (error) {
    console.error("Error adding action:", error); // Log any errors that occur during the request
  }
}

export function useAddActions() {
  const queryClient = useQueryClient();

  // The mutation for adding an action
  const { mutate: addActionContent, isPending: isAdding } = useMutation({
    mutationFn: (newAction) => addAction(newAction), // Pass the argument to addAction
    onSuccess: () => {
      toast.success("Action Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["actions"], // Invalidate the "actions" query to refresh data
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, addActionContent };
}
