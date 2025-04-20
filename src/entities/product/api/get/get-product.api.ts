import { apiClient } from "@/shared/config/apiClient";

export const getProduct = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
