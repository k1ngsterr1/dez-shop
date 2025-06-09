import { apiClient } from "@/shared/config/apiClient";
import type { Product } from "../../dto/product.dto";

export const getSubcategoryProducts = async (
  subcategoryName: string
): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>(`/api/product`, {
      params: { subcategory: subcategoryName },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    throw error;
  }
};
