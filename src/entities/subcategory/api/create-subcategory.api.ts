import { apiClient } from "@/shared/config/apiClient";
import type { CreateSubcategoryDto, Subcategory } from "../dto/subcategory.dto";

export const createSubcategory = async (
  data: CreateSubcategoryDto
): Promise<Subcategory> => {
  try {
    const response = await apiClient.post<Subcategory>(
      "/api/subcategory",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
};
