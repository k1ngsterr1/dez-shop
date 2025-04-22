"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getProducts } from "../../api/get/get-products.api";

export const useProductsQuery = (name?: string) => {
  //@ts-ignore
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getProducts(name);
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
  }, [name]);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getProducts(name);
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
