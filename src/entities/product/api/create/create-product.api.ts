import { apiClient } from "@/shared/config/apiClient";
import { CreateProductDto } from "./dto/create-product.dto";

export const createProduct = async (data: CreateProductDto) => {
  try {
    const response = await apiClient.post("/product", data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
