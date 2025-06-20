"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
  activeImage: number;
  setActiveImage: (idx: number) => void;
  handleChangeId: (idx: number) => void;
}

export function ProductGallery({
  images,
  productName,
  isNew,
  activeImage,
  setActiveImage,
  handleChangeId,
}: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
        <Image
          src={images[activeImage] ?? images[0] ?? "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
        {isNew && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            Новинка
          </Badge>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              className={`relative aspect-square rounded-md overflow-hidden border ${
                activeImage === index
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              }`}
              onClick={() => {
                setActiveImage(index);
                handleChangeId(index);
              }}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${productName} — image #${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
