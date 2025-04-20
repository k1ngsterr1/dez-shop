import { apiClient } from "@/shared/config/apiClient";

export const getCategory = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
