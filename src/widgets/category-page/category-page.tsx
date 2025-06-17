"use client";

import { ProductCard } from "@/entities/product/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import { useEffect, useState } from "react";
import { useCategoryProductsQuery } from "@/entities/product/hooks/query/get-category-products";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CategoryProductsContent({ slug }: { slug: string }) {
  const { data: products, isLoading, error } = useCategoryProductsQuery(slug);
  const { data: categories } = useCategoriesQuery();
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    if (categories) {
      const decodedSlug = decodeURIComponent(slug);

      const category = categories.find((cat) => cat.name === decodedSlug);

      if (category) {
        setCategoryName(category.name);
      } else {
        setCategoryName(decodedSlug);
      }
    }
  }, [categories, slug]);

  // Группируем продукты по подкатегории
  const subcategoryMap: Record<string, any[]> = {};
  if (products && products.length > 0) {
    products.forEach((product) => {
      const subcat = product.subcategory || "Без подкатегории";
      if (!subcategoryMap[subcat]) subcategoryMap[subcat] = [];
      subcategoryMap[subcat].push(product);
    });
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-full max-w-2xl" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-square h-[250px] w-full" />
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Skeleton className="h-8 w-1/3" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться в каталог
              </Link>
            </Button>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>
                Не удалось загрузить товары категории. Пожалуйста, попробуйте
                позже.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться в каталог
            </Link>
          </Button>
          <div>
            <h1 className="mb-2 text-3xl font-bold">
              {categoryName || "Категория"}
            </h1>
            {products && products[0]?.subcategory && (
              <p className="mb-1 text-lg font-semibold text-primary">
                {products[0].subcategory}
              </p>
            )}
            <p className="text-muted-foreground">
              {categoryName
                ? `Профессиональные средства из категории "${categoryName}"`
                : "Профессиональные средства из выбранной категории"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products && Object.keys(subcategoryMap).length > 0 ? (
          Object.entries(subcategoryMap).map(([subcat, prods]) => (
            <div key={subcat} className="col-span-full mb-6">
              <h2 className="mb-2 text-xl font-semibold text-primary">
                {subcat}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {prods.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <Card className="col-span-full overflow-hidden">
            <CardContent className="flex items-center justify-center p-12 text-center">
              <p className="text-muted-foreground">
                В данной категории товары не найдены
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
