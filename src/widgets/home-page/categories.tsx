"use client";

import Link from "next/link";
import { Droplets, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import type { Subcategory } from "@/entities/subcategory/dto/subcategory.dto";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSubcategoriesQuery } from "@/entities/subcategory/hooks/query/use-get-subcategories.query";

export function Categories() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategoriesQuery();
  const {
    data: subcategoriesData,
    isLoading: isLoadingSubcategories,
    error: errorSubcategories,
  } = useSubcategoriesQuery();
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>(
    {}
  );

  const subcategoriesByCategoryId = useMemo(() => {
    if (!subcategoriesData) return new Map<number, Subcategory[]>();
    return subcategoriesData.reduce((acc, sub) => {
      if (!acc.has(sub.categoryId)) {
        acc.set(sub.categoryId, []);
      }
      acc.get(sub.categoryId)!.push(sub);
      return acc;
    }, new Map<number, Subcategory[]>());
  }, [subcategoriesData]);

  const toggleCategory = (categoryId: number) => {
    setOpenCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const isLoading = isLoadingCategories || isLoadingSubcategories;
  const error = errorCategories || errorSubcategories;

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="space-y-3">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="space-y-2 py-1">
                <Skeleton className="h-6 w-3/4" />
                <div className="pl-4 space-y-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Не удалось загрузить данные. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-primary">Категории</h2>
        <p className="text-sm text-muted-foreground">Категории не найдены</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-primary">Категории</h2>
      <ul className="space-y-1">
        {categories?.map((category) => {
          const categorySubcategories =
            subcategoriesByCategoryId.get(category.id) || [];
          return (
            <li key={category.id}>
              <div className="flex items-center justify-between rounded-md transition-colors hover:bg-muted">
                <Link
                  href={`/category/${encodeURIComponent(category.name)}`}
                  className="flex flex-1 items-center p-2 text-sm"
                >
                  <Droplets className="mr-2 h-4 w-4 text-primary" />
                  <span>{category.name}</span>
                </Link>
              </div>
              {categorySubcategories.length > 0 && (
                <ul className="pl-6 pt-1 space-y-1 border-l border-border ml-3 my-1">
                  {categorySubcategories.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/subcategory/${encodeURIComponent(sub.name)}`}
                        className="flex items-center rounded-md p-1.5 text-xs transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <span>{sub.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
