"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProductsQuery } from "@/entities/product/hooks/query/use-get-products.query";
import { useRouter } from "next/navigation";

export function ProductSlider() {
  const navigate = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const { data: products, isLoading, error } = useProductsQuery();

  // Set up the carousel API and current slide tracking
  const onApiChange = useCallback((api: CarouselApi | null) => {
    if (!api) return;
    setApi(api);

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="relative rounded-lg border bg-card shadow-sm">
        <div className="aspect-[2/1] w-full">
          <Skeleton className="h-full w-full rounded-t-lg" />
        </div>
        <div className="p-3">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-3 w-full mb-3" />
          <Skeleton className="h-8 w-24" />
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
            Не удалось загрузить слайдер товаров. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // If no products found
  if (!products || products.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-center text-muted-foreground">
          Товары для слайдера не найдены
        </p>
      </div>
    );
  }

  // @ts-ignore
  const getBadgeText = (product: any) => {
    if (product.isNew) return "Новинка";
    if (product.isPopular) return "Популярное";
    if (product.badge) return product.badge;
    return null;
  };

  return (
    <div className="relative rounded-lg border bg-card shadow-sm">
      <Carousel className="w-full" setApi={onApiChange}>
        <CarouselContent>
          {products.map((product: any) => (
            <CarouselItem key={product.id}>
              <div className="relative">
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-lg bg-gray-50">
                  <Image
                    src={
                      product.images[0] ||
                      "/placeholder.svg?height=300&width=600" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {getBadgeText(product) && (
                  <Badge className="absolute right-3 top-3 bg-primary text-xs">
                    {getBadgeText(product)}
                  </Badge>
                )}
                <div className="p-3">
                  <h3 className="mb-1 text-base font-bold">{product.name}</h3>
                  <p className="mb-2 text-xs text-muted-foreground line-clamp-2">
                    {product.description
                      ? product.description.length > 200
                        ? `${product.description.slice(0, 200)}...`
                        : product.description
                      : `${product.category} - ${product.price} ₽`}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => navigate.push(`/product/${product.id}`)}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1 p-1">
        {products.slice(0, 10).map((_: number, index: number) => (
          <span
            key={index}
            className={`block h-1.5 w-1.5 rounded-full cursor-pointer transition-colors duration-200 ${
              currentSlide === index
                ? "bg-primary"
                : "bg-muted hover:bg-muted-foreground"
            }`}
            onClick={() => api?.scrollTo(index)}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
