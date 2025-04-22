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
import React from "react";

interface IProductCard {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew: boolean;
    isPopular: boolean;
    isInStock: boolean;
  };
}

export const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const { openContactForm } = useContactFormStore();

  return (
    <Card
      key={product.id}
      className="group overflow-hidden transition-all hover:shadow-md"
    >
      <div className="relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="absolute left-2 top-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">
              Новинка
            </Badge>
          )}
        </div>
        <div className="absolute right-2 top-2">
          {product.isPopular && (
            <Badge className="bg-accent text-accent-foreground">
              Популярное
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="line-clamp-2 min-h-[3rem] text-lg font-medium">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.category}</p>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">{formatPrice(product.price)}</div>
          {!product.isInStock && (
            <Badge className="text-white">Нет в наличии</Badge>
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
