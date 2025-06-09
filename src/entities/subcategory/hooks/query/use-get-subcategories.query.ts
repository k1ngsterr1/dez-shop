"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios"; // Assuming your getSubcategories API uses axios or similar for error checking
import { getSubcategories } from "../../api/get-subcategories.api";
import type { Subcategory } from "../../dto/subcategory.dto";

export const useSubcategoriesQuery = () => {
  const [data, setData] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSubcategories();
      setData(result);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
