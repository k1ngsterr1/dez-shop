"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getProduct } from "../../api/get/get-product.api";

export const useProductQuery = (id: number) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getProduct(id);
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

    if (id) {
      fetchData();
    }
  }, [id]);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getProduct(id);
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
