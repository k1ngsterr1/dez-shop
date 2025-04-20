import { apiClient } from "@/shared/config/apiClient";

export const updateProduct = async (id: number, data: FormData) => {
  try {
    const response = await apiClient.patch(`api/product/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};
