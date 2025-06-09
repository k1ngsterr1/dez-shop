export interface Item {
  price: number;
  volume: string;
}

// Updated Product interface to use string names for category and subcategory
export interface Product {
  id: number;
  name: string;
  category: string; // Changed from categoryId
  subcategory: string; // Changed from subcategoryId, assuming empty string if no subcategory
  description: string;
  items: string; // JSON string from backend
  isInStock: boolean;
  isPopular: boolean;
  images: string[]; // URLs of existing images
  expiry: string;
  createdAt: Date;
  updatedAt: Date;
}

// This DTO represents the structure for form values, now using names
export interface ProductFormValues {
  name: string;
  category: string; // Uses name
  subcategory: string; // Uses name, send "" if not applicable to match backend DTO
  description: string;
  items: Item[]; // Array of objects
  expiry: string;
  isInStock: boolean;
  isPopular: boolean;
}

// This interface is used for passing data to the mutation hooks.
// It now correctly reflects that category/subcategory will be names.
export interface ProductWithImages extends Partial<ProductFormValues> {
  images?: File[]; // New images to upload
  existingImages?: string[]; // URLs of existing images to keep (used for updates)
  formData?: FormData; // FormData will contain names for category/subcategory
  // categoryName and subcategoryName are removed as ProductFormValues now has category/subcategory as strings
}
