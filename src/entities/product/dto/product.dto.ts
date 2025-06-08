export interface Item {
  price: number;
  volume: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  // The backend sends `items` as a JSON string.
  // It needs to be parsed on the client.
  items: string;
  isInStock: boolean;
  isPopular: boolean;
  images: string[];
  expiry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormValues {
  name: string;
  category: string;
  description: string;
  items: Item[];
  expiry: string;
  isInStock: boolean;
  isPopular: boolean;
}

// This interface is used for passing data to the mutation hooks
export interface ProductWithImages extends Partial<ProductFormValues> {
  images?: File[];
  formData?: FormData;
}
