import { apiClient } from "@/shared/config/apiClient";

export const updateCategory = async (id: number, data: { name: string }) => {
  try {
    const response = await apiClient.patch(`/api/category/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};
