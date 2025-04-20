import { apiClient } from "@/shared/config/apiClient";

export const deleteCategory = async (id: number) => {
  try {
    const response = await apiClient.delete(`/api/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
