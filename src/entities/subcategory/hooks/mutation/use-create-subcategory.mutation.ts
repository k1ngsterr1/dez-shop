"use client";

import { useState } from "react";
import axios from "axios";
import { createSubcategory } from "../../api/create-subcategory.api";
import type {
  CreateSubcategoryDto,
  Subcategory,
} from "../../dto/subcategory.dto";

export const useCreateSubcategoryMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = async (
    data: CreateSubcategoryDto
  ): Promise<Subcategory> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createSubcategory(data);
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
      throw err; // Re-throw to be caught by the caller if needed
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutateAsync,
    isLoading, // Renamed from isPending to match your products hook style
    error,
  };
};
