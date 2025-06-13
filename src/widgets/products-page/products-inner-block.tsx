"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useProductQuery } from "@/entities/product/hooks/query/use-get-product.query";
import { ProductBreadcrumbs } from "./products-breadcrumbs";
import { ProductGallery } from "./product-gallery";
import ProductInfo from "./product-info";
import { ProductActions } from "./products-actions";
import { ProductTabs } from "./product-tabs";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const handleChangeId = (id: number) => {
    setSelectedId(id);
    setActiveImage(id);
  };

  const { data: product, isLoading, error } = useProductQuery(productId);

  const isNewProduct = useMemo(() => {
    if (!product) return false;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(product.createdAt) > sevenDaysAgo;
  }, [product]);

  if (!productId && !isLoading) {
    // Check productId only if not loading
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

  // Construct links for breadcrumbs
  const categoryLink = `/category/${encodeURIComponent(product.category)}`;
  const subcategoryLink = product.subcategory
    ? `/subcategory/${encodeURIComponent(product.subcategory)}`
    : undefined;

  return (
    <div className="container w-full mx-auto px-4 py-8">
      <ProductBreadcrumbs
        productName={product.name}
        categoryName={product.category}
        categoryLink={categoryLink}
        subcategoryName={product.subcategory || undefined} // Pass undefined if empty string
        subcategoryLink={subcategoryLink}
      />
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <ProductGallery
          images={product.images}
          productName={product.name}
          isNew={isNewProduct}
          selectedId={selectedId}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
        <div className="flex flex-col justify-between">
          <ProductInfo product={product} handleChangeId={handleChangeId} />
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
          <Skeleton className="h-10 w-3/4" /> {/* Product Name */}
          <Skeleton className="h-6 w-1/2" /> {/* Category/Subcategory */}
          <Skeleton className="h-8 w-1/4" /> {/* Price */}
          <div className="space-y-3 mt-6">
            {" "}
            {/* Description */}
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="pt-6">
            {" "}
            {/* Actions */}
            <Skeleton className="h-12 w-full md:w-1/2" />
          </div>
        </div>
      </div>
      <div>
        {" "}
        {/* Tabs */}
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
