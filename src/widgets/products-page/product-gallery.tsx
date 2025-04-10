"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
  discount?: number;
}

export function ProductGallery({
  images,
  productName,
  isNew,
  discount,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
        <Image
          src={images[activeImage] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
        {isNew && <Badge className="absolute top-4 left-4">Новинка</Badge>}
        {discount && discount > 0 && (
          <Badge className="absolute top-4 right-4 bg-destructive">
            -{discount}%
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square rounded-md overflow-hidden border ${
              activeImage === index ? "border-primary" : "border-border"
            }`}
            onClick={() => setActiveImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - изображение ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
