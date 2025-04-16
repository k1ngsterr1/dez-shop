import { apiClient } from "@/shared/config/apiClient";
import { UpdateProductDto } from "./dto/update-product.dto";

export const updateProduct = async (id: number, data: UpdateProductDto) => {
  try {
    const response = await apiClient.patch(`/product/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
