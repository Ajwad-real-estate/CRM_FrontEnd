import { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useUpdateAction = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateActionById = async ({ actionId, actionData }) => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await axios.put(
        `${apiUrl}/api/actions/${actionId}`,
        actionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setIsUpdating(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update action');
      setIsUpdating(false);
      throw err;
    }
  };

  return {
    updateActionById,
    isUpdating,
    error,
  };
};
