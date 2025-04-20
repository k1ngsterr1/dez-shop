import { apiClient } from "@/shared/config/apiClient";

export const createCategory = async (data: { name: string }) => {
  try {
    const response = await apiClient.post("/api/category", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
