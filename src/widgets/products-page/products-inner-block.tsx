"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ProductGallery } from "./product-gallery";
import { ProductTabs } from "./product-tabs";
import { ProductActions } from "./products-actions";
import { ProductBreadcrumbs } from "./products-breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useProductQuery } from "@/entities/product/hooks/query/use-get-product.query";
import ProductInfo from "./product-info";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id);

  const { data: product, isLoading, error } = useProductQuery(productId);

  const isNewProduct = useMemo(() => {
    if (!product) return false;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(product.createdAt) > sevenDaysAgo;
  }, [product]);

  if (!productId) {
    return (
      <div className="container w-full mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>Неверный ID продукта.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container w-full mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            {error?.message ||
              "Не удалось загрузить детали продукта. Пожалуйста, попробуйте позже."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto px-4 py-8">
      <ProductBreadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <ProductGallery
          images={product.images}
          productName={product.name}
          isNew={isNewProduct}
        />
        <div className="flex flex-col justify-between">
          <ProductInfo product={product} />
          <ProductActions
            expiry={product.expiry}
            isInStock={product.isInStock}
          />
        </div>
      </div>
      <ProductTabs description={product.description} />
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container w-full mx-auto px-4 py-8">
      <div className="h-6 w-1/2 md:w-1/3 mb-8">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <div className="aspect-square w-full">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
          <div className="space-y-3 mt-6">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="pt-6">
            <Skeleton className="h-12 w-full md:w-1/2" />
          </div>
        </div>
      </div>
      <div>
        <div className="border-b mb-6">
          <Skeleton className="h-10 w-1/3 md:w-1/4" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>
    </div>
  );
}
