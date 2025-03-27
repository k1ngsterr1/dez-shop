"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    title: "Дезинфицирующие средства Spell",
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Профессиональные дезинфицирующие средства для различных поверхностей",
    badge: "Популярное",
  },
  {
    id: 2,
    title: "Антисептики для рук",
    image: "/placeholder.svg?height=400&width=800",
    description: "Эффективные антисептики для гигиены рук",
  },
  {
    id: 3,
    title: "Моющие средства для профессионального использования",
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Высокоэффективные моющие средства для профессиональной уборки",
  },
  {
    id: 4,
    title: "Средства для дезинфекции медицинских учреждений",
    image: "/placeholder.svg?height=400&width=800",
    description: "Специализированные средства для медицинских учреждений",
    badge: "Новинка",
  },
];

export function ProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative rounded-lg border bg-card shadow-sm">
      <Carousel
        className="w-full"
        onSelect={(index: any) => setCurrentSlide(index)}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id}>
              <div className="relative">
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {product.badge && (
                  <Badge className="absolute right-4 top-4 bg-primary">
                    {product.badge}
                  </Badge>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{product.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <Button>Подробнее</Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 p-2">
        {products.map((_, index) => (
          <span
            key={index}
            className={`block h-2 w-2 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
