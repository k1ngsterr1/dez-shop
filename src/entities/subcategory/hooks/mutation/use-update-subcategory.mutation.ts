"use client";

import { useState } from "react";
import axios from "axios";
import { updateSubcategory } from "../../api/update-subcategory.api";
import type {
  UpdateSubcategoryDto,
  Subcategory,
} from "../../dto/subcategory.dto";

interface UpdateVariables {
  id: number;
  data: UpdateSubcategoryDto;
}

export const useUpdateSubcategoryMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = async ({
    id,
    data,
  }: UpdateVariables): Promise<Subcategory> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateSubcategory(id, data);
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
    mutateAsync,
    isLoading, // Renamed from isPending
    error,
  };
};
