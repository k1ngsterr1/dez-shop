// dto/product.dto.ts

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface Item {
  price: number;
  volume: string;
}

// Теперь продукт приходит так:
export interface Product {
  id: number;
  name: string;
  description: string;
  items: string; // JSON-строка
  isInStock: boolean;
  isPopular: boolean;
  images: string[]; // существующие URL
  expiry: string;
  createdAt: Date;
  updatedAt: Date;

  categories: Category[]; // массив категорий
  subcategories: Subcategory[];
}

// Для формы:
export interface ProductFormValues {
  name: string;
  description: string;
  isInStock: boolean;
  isPopular: boolean;
  expiry: string;
  images: File[]; // новые файлы
  existingImages?: string[]; // URL оставшихся картинок
  items: Item[]; // промапленные объекты

  categoryIds: string[]; // ID категорий как строки
  subcategoryIds: string[];
}

// Для мутации:
export interface ProductWithImages {
  name?: string;
  description?: string;
  isInStock?: boolean;
  isPopular?: boolean;
  expiry?: string;
  items?: Item[];
  formData?: FormData;
  images?: File[]; // New images to upload
  existingImages?: string[]; // URLs of existing images to keep (used for updates)
  categoryIds?: number[]; // Array of category IDs for backend
  subcategoryIds?: number[]; // Array of subcategory IDs for backend
}
