import { apiClient } from "@/shared/config/apiClient";
import type { Category } from "../../dto/category.dto"; // Import Category type

export const getCategories = async (name?: string): Promise<Category[]> => {
  // Return type Category[]
  try {
    const params = name ? { name } : {};
    const response = await apiClient.get<Category[]>("/api/category", {
      params,
    }); // Expect Category[]
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Consider how you want to handle errors, e.g., rethrow or return empty array
    throw error; // Re-throwing for the hook to catch
  }
};
