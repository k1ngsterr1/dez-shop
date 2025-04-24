"use client";

import { ProductCard } from "@/entities/product/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProductsQuery } from "@/entities/product/hooks/query/use-get-products.query";

export function ProductsBlock() {
  const { data: products, isLoading, error } = useProductsQuery();

  // Loading statee
  if (isLoading) {
    return (
      <div className="py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Популярные товары</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Профессиональные дезинфицирующие и моющие средства высокого качества
            для различных сфер применения
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Не удалось загрузить товары. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">Популярные товары</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Профессиональные дезинфицирующие и моющие средства высокого качества
          для различных сфер применения
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
