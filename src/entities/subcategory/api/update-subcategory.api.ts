import { apiClient } from "@/shared/config/apiClient";
import type { UpdateSubcategoryDto, Subcategory } from "../dto/subcategory.dto";

export const updateSubcategory = async (
  id: number,
  data: UpdateSubcategoryDto
): Promise<Subcategory> => {
  try {
    const response = await apiClient.patch<Subcategory>(
      `/api/subcategory/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating subcategory with ID ${id}:`, error);
    throw error;
  }
};
