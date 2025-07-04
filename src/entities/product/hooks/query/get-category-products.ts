"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCategoryProducts } from "../../api/get/get-category-products.api";
import type { Product } from "../../dto/product.dto";

// The hook's name was slightly different in your code, let's standardize it
export const useCategoryProductsQuery = (encodedSlug?: string) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // If there's no slug, don't fetch.
    if (!encodedSlug) {
      setData([]);
      setIsLoading(false);
      return;
    }

    // **THE FIX IS HERE**: Decode the slug before using it.
    const decodedCategoryName = decodeURIComponent(encodedSlug);

    try {
      setIsLoading(true);
      setError(null);
      // Pass the DECODED name to the API function
      const result = await getCategoryProducts(decodedCategoryName);
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
  }, [encodedSlug]); // Dependency is the original encoded slug

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
