import { apiClient } from "@/shared/config/apiClient";

export const deleteSubcategory = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/api/subcategory/${id}`);
  } catch (error) {
    console.error(`Error deleting subcategory with ID ${id}:`, error);
    throw error;
  }
};
