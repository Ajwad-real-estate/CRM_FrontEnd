import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



export const useUpdateAction = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateActionById = async ({ actionId, actionData }) => {
    setIsUpdating(true);
    setError(null);
    console.log("updateActionById");
    console.log("actionData");
    console.log(actionData);
    try {
      const response = await axios.put(
        `${apiUrl}/api/actions/${actionId}`,
        actionData,

        // body: JSON.stringify(actionData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      setIsUpdating(false);
      toast.success("Action Updated Successfully");

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update action");
      setIsUpdating(false);
      toast.error(err.message);
      throw err;
    }
  };

  return {
    updateActionById,
    isUpdating,
    error,
  };
};
