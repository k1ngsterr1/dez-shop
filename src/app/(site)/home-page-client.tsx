"use client";

import React, { useState, useEffect } from "react";
import { ProductSlider } from "@/features/product-slider/product-slider";
import { DisinfectantCalculator } from "@/widgets/home-page/calculator";
import { Categories } from "@/widgets/home-page/categories";
import { HeroSection } from "@/widgets/home-page/hero-section";
import { ProductsBlock } from "@/widgets/home-page/products-block";
import { DropletLoader } from "@/components/ui/sanitize-loader";

export function HomePageClient() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already visited
    const visited =
      typeof window !== "undefined" && localStorage.getItem("dezshop_visited");
    if (visited) {
      setIsLoading(false);
      return;
    }
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("dezshop_visited", "1");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show loader while loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <DropletLoader
          size="lg"
          text={
            [
              "Загружаем ваш магазин...",
              "Подготавливаем витрину...",
              "Почти готово!",
              "Секундочку, идет загрузка...",
              "Собираем лучшие предложения...",
            ][Math.floor(Math.random() * 5)]
          }
          showCircularLoader={true}
        />
      </div>
    );
  }

  // Show main content after loading
  return (
    <div className="container w-full mx-auto py-8 pt-6">
      <HeroSection />
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Categories />
        </div>
        <div className="lg:col-span-3">
          <ProductSlider />
        </div>
      </div>
      <ProductsBlock />
      <DisinfectantCalculator />
    </div>
  );
}
