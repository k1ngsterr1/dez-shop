"use client";

import Link from "next/link";
import { Droplets, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";

export function Categories() {
  const { data: categories, isLoading, error } = useCategoriesQuery();

  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="space-y-2">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-full max-w-[200px]" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Не удалось загрузить категории. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // If no categories found
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
      <ul className="space-y-2">
        {categories.map((category) => {
          return (
            <li key={category.id || category.name}>
              <Link
                href={category.href || `/category/${category.name}`}
                className="flex items-center rounded-md p-2 text-sm transition-colors hover:bg-muted"
              >
                <Droplets className="mr-2 h-4 w-4 text-primary" />
                <span>{category.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
