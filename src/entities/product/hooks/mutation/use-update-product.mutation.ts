"use client";

import { useState } from "react";
import axios from "axios";
import { updateProduct } from "../../api/patch/patch-product.api";
import { UpdateProductDto } from "../../api/patch/dto/update-product.dto";

export const useUpdateProductMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: number, data: UpdateProductDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await updateProduct(id, data);
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
