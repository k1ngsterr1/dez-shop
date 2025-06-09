"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getSubcategoryProducts } from "../../api/get/get-subcategory-products.api";
import type { Product } from "../../dto/product.dto";

export const useSubcategoryProductsQuery = (encodedSlug?: string) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!encodedSlug) {
      setData([]);
      setIsLoading(false);
      return;
    }
    const decodedSubcategoryName = decodeURIComponent(encodedSlug);
    try {
      setIsLoading(true);
      setError(null);
      const result = await getSubcategoryProducts(decodedSubcategoryName);
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
  }, [encodedSlug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
