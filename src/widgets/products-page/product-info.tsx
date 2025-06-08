import type React from "react";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  isInStock: boolean;
  description: string;
  images: { url: string }[];
  category: { name: string };
  size: { name: string };
  color: { name: string };
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold">
          {formatPrice(product.price)} ₸
        </span>
        {product.oldPrice && (
          <span className="text-xl text-muted-foreground line-through">
            {formatPrice(product.oldPrice)} ₽
          </span>
        )}
        {product.isInStock ? (
          <Badge
            variant="outline"
            className="ml-auto bg-green-50 text-green-700 border-green-200"
          >
            <Check className="h-3 w-3 mr-1" /> В наличии
          </Badge>
        ) : (
          <Badge variant="outline" className="ml-auto !text-white">
            Нет в наличии
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground">{product.description}</p>
    </div>
  );
};

export default ProductInfo;
