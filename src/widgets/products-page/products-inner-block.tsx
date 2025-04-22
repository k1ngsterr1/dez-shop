"use client";
import { useParams } from "next/navigation";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductTabs } from "./product-tabs";
import { ProductActions } from "./products-actions";
import { ProductBreadcrumbs } from "./products-breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useProductQuery } from "@/entities/product/hooks/query/use-get-product.query";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id) || 1; // Default to 1 if no ID is provided

  const { data: product, isLoading, error } = useProductQuery(productId);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container w-full mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message ||
              "Failed to load product details. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto px-4 py-8">
      <ProductBreadcrumbs productName={product.name} />
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ProductGallery
          images={product.images}
          productName={product.name}
          isNew={product.isNew}
          discount={product.discount}
        />
        <div>
          <ProductInfo product={product} />
          <ProductActions expiry={product.expiry} />
        </div>
      </div>
      <ProductTabs description={product.description} />
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container w-full mx-auto px-4 py-8">
      <div className="h-6 w-64 mb-8">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
          <div className="space-y-2 mt-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="pt-6">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
      <div>
        <div className="border-b mb-4">
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
