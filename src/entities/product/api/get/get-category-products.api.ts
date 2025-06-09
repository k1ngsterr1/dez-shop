import { apiClient } from "@/shared/config/apiClient";
import type { Product } from "../../dto/product.dto";

export const getCategoryProducts = async (
  category: string,
  subcategory?: string
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    if (category) {
      params.append("category", category);
    }
    if (subcategory) {
      params.append("subcategory", subcategory);
    }

    const response = await apiClient.get<Product[]>(`/api/product`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category/subcategory:", error);
    throw error;
  }
};
