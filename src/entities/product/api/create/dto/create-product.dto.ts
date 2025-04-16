export interface CreateProductDto {
  name: string;
  category: string;
  description: string;
  images: string[];
  isInStock: boolean;
  isPopular?: boolean;
  price: number;
}
