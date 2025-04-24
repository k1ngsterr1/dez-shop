import { apiClient } from "@/shared/config/apiClient";

export const getCategoryProducts = async (category: string) => {
  try {
    const response = await apiClient.get(`/api/product?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
