"use client";

import { useState } from "react";
import axios from "axios";
import { deleteSubcategory } from "../../api/delete-subcategory.api";

export const useDeleteSubcategoryMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteSubcategory(id);
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
    mutateAsync,
    isLoading, // Renamed from isPending
    error,
  };
};
