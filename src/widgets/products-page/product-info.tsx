import { Badge } from "@/components/ui/badge";
import { Check, Droplets, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProductInfoProps {
  product: {
    name: string;
    subtitle: string;
    description: string;
    price: number;
    oldPrice?: number;
    sku: string;
    inStock: boolean;
    volume: string;
    concentration: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs font-normal">
          Артикул: {product.sku}
        </Badge>
      </div>
      <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
      <p className="text-lg text-muted-foreground mb-4">{product.subtitle}</p>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold">{product.price} ₽</span>
        {product.oldPrice && (
          <span className="text-xl text-muted-foreground line-through">
            {product.oldPrice} ₽
          </span>
        )}
        {product.inStock ? (
          <Badge
            variant="outline"
            className="ml-auto bg-green-50 text-green-700 border-green-200"
          >
            <Check className="h-3 w-3 mr-1" /> В наличии
          </Badge>
        ) : (
          <Badge variant="outline" className="ml-auto">
            Нет в наличии
          </Badge>
        )}
      </div>

      <p className="text-muted-foreground mb-6">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Объем</p>
            <p className="font-medium">{product.volume}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Концентрация</p>
            <p className="font-medium">{product.concentration}</p>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
    </div>
  );
}
