"use client";

import { useState } from "react";
import axios from "axios";
import { createProduct } from "../../api/create/create-product.api";
import type { ProductWithImages } from "../../dto/product.dto";

export const useCreateProductMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: ProductWithImages) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if data contains FormData and use it
      if (data.formData) {
        const result = await createProduct(data.formData);
        return result;
      } else {
        throw new Error("FormData is required");
      }
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
