"use client";

import { useState } from "react";

import axios from "axios";
import { createProduct } from "../../api/create/create-product.api";
import { CreateProductDto } from "../../api/create/dto/create-product.dto";

export const useCreateProductMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateProductDto) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await createProduct(data);
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
