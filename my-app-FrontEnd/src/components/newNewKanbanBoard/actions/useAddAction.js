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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(actionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding action:", error);
  }
}

export function useAddActions() {
  const queryClient = useQueryClient();

  const { mutate: addActionContent, isPending: isAdding } = useMutation({
    mutationFn: (newAction) => addAction(newAction),
    onSuccess: () => {
      toast.success("Action Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["actions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, addActionContent };
}
