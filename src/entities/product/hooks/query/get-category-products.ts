"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCategoryProducts } from "../../api/get/get-category-products.api";

export const useCategoryProductsQuery = (category: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getCategoryProducts(category);
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
    };

    fetchData();
  }, [category]);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getCategoryProducts(category);
      setData(result);
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
    data,
    isLoading,
    error,
    refetch,
  };
};
