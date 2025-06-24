import { apiClient } from "@/shared/config/apiClient";

export const sendForm = async (data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await apiClient.post("/api/user/form", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const sendContactForm = async (data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await apiClient.post("/api/user/contact-form", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
