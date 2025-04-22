export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  isInStock: boolean;
  isPopular: boolean;
  images: string[];
  volume: number;
  expiry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  volume: number;
  expiry: string;
  isInStock: boolean;
  isPopular: boolean;
}

// Update the ProductWithImages interface to only include formData
export interface ProductWithImages extends Partial<ProductFormValues> {
  images?: string[];
  formData?: FormData;
}
