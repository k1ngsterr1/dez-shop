"use client";

import { useState } from "react";
import axios from "axios";
import { updateCategory } from "../../api/patch/update-category.api";

export const useUpdateCategoryMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: number, data: { name: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await updateCategory(id, data);
      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        setError(new Error(errorMessage));
      } else {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
  };
};
