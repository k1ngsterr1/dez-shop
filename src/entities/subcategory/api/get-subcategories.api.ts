import { apiClient } from "@/shared/config/apiClient";

export const getSubcategories = async () => {
  try {
    const response = await apiClient.get("/api/subcategory");
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};
