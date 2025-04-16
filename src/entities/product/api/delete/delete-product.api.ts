import { apiClient } from "@/shared/config/apiClient";

export const deleteProduct = async (id: number) => {
  try {
    const response = await apiClient.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
