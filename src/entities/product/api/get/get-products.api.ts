import { apiClient } from "@/shared/config/apiClient";

export const getProducts = async (name?: string) => {
  try {
    const params = name ? { name } : {};
    const response = await apiClient.get("/api/product", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
