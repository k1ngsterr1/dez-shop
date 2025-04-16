"use client";

import { useState } from "react";
import axios from "axios";
import { deleteProduct } from "../../api/delete/delete-product.api";

export const useDeleteProductMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await deleteProduct(id);
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
