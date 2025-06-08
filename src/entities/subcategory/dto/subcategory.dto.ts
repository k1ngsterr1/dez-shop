import type { Category } from "@/entities/category/dto/category.dto";

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  category?: Category; // Optional, if included in API response
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubcategoryDto {
  name: string;
  categoryId: number;
}

export interface UpdateSubcategoryDto extends Partial<CreateSubcategoryDto> {}
