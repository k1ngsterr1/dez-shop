"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "@/entities/product/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSubcategoryProductsQuery } from "@/entities/product/hooks/query/use-subcategory-products.query";
import { Categories } from "@/widgets/home-page/categories";

export default function SubcategoryPage() {
  const params = useParams();
  const slug = params.slug as string | undefined;
  const {
    data: products,
    isLoading,
    error,
  } = useSubcategoryProductsQuery(slug);

  const subcategoryName = slug ? decodeURIComponent(slug) : "Подкатегория";

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 xl:w-1/4">
          <Categories />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4 -ml-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться в каталог
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{subcategoryName}</h1>
            <p className="text-muted-foreground">
              Профессиональные средства из подкатегории "{subcategoryName}"
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="flex min-h-[300px] items-center justify-center p-12 text-center">
                  <p className="text-muted-foreground">
                    В данной подкатегории товары не найдены.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
