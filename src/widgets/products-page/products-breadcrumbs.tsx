import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbsProps {
  productName: string;
}

export function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-6">
      <span>Главная</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span>Каталог</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span>Дезинфицирующие средства</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="text-foreground font-medium">{productName}</span>
    </div>
  );
}
