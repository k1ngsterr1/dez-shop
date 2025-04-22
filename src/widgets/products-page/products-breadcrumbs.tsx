import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProductBreadcrumbsProps {
  productName: string;
}

export function ProductBreadcrumbs({ productName }: ProductBreadcrumbsProps) {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-primary">
        Главная
      </Link>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="text-foreground font-medium">{productName}</span>
    </div>
  );
}
