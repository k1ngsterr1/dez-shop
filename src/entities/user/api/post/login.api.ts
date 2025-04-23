import { apiClient } from "@/shared/config/apiClient";

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await apiClient.post("/api/user/login", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
