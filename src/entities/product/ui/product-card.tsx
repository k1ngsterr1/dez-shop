"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useContactFormStore } from "@/entities/contact-form/store/use-contact-form";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useMemo } from "react";
import type { Item } from "../dto/product.dto";
import { useRouter } from "next/navigation";

interface IProductCard {
  product: {
    id: number;
    name: string;
    // `items` is a JSON string from the backend
    items: string;
    images: string[];
    categories: any[];
    isPopular: boolean;
    isInStock: boolean;
    createdAt: Date; // Use createdAt to determine if it's new
  };
}

// Helper to safely parse items and get the first one
const getFirstItem = (itemsJson: string): Item | null => {
  try {
    if (!itemsJson) return null;
    const items = JSON.parse(itemsJson);
    return Array.isArray(items) && items.length > 0 ? items[0] : null;
  } catch (e) {
    console.error("Failed to parse product items:", e);
    return null;
  }
};

export const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const { openContactForm } = useContactFormStore();
  const navigate = useRouter();

  const firstItem = useMemo(() => getFirstItem(product.items), [product.items]);
  // Determine if the product is new (e.g., created in the last 7 days)
  const isNew = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(product.createdAt) > sevenDaysAgo;
  }, [product.createdAt]);

  return (
    <Card
      key={product.id}
      onClick={() => navigate.push(`/product/${product.id}`)}
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-md flex flex-col"
    >
      <div className="relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground">
              Новинка
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-accent text-accent-foreground">
              Популярное
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="line-clamp-2 min-h-[3rem] text-lg font-medium">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">
          {product.categories[0].name}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">
            {firstItem ? formatPrice(firstItem.price) : "Цена по запросу"}
          </div>
          {!product.isInStock && (
            <Badge variant="secondary" className="text-white">
              Нет в наличии
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          className="w-full"
          onClick={openContactForm}
          disabled={!product.isInStock}
        >
          Связаться
        </Button>
      </CardFooter>
    </Card>
  );
};
