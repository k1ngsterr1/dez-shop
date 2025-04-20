import { apiClient } from "@/shared/config/apiClient";

export const createProduct = async (data: FormData) => {
  try {
    const response = await apiClient.post("api/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
