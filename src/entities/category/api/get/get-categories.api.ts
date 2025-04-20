import { apiClient } from "@/shared/config/apiClient";

export const getCategories = async (name?: string) => {
  try {
    const params = name ? { name } : {};
    const response = await apiClient.get("/api/category", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
