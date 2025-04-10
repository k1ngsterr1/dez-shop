"use client";

import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductTabs } from "./product-tabs";
import { ProductActions } from "./products-actions";
import { ProductBreadcrumbs } from "./products-breadcrumbs";

// Sample product data
const product = {
  id: 1,
  name: "ДезоПроф Ультра",
  subtitle: "Концентрированное средство для дезинфекции поверхностей",
  description:
    "Высокоэффективное концентрированное средство для дезинфекции поверхностей в медицинских учреждениях, на предприятиях пищевой промышленности и в быту. Обладает широким спектром антимикробной активности.",
  price: 1250,
  oldPrice: 1450,
  discount: 14,
  sku: "DP-ULTRA-1L",
  rating: 4.8,
  reviewCount: 124,
  inStock: true,
  isNew: true,
  volume: "1 литр",
  concentration: "2%",
  images: [
    "/product-main.jpg",
    "/product-angle.jpg",
    "/product-usage.jpg",
    "/product-package.jpg",
  ],
  features: [
    "Уничтожает 99.9% бактерий и вирусов",
    "Безопасно для большинства поверхностей",
    "Экономичный расход",
    "Не содержит хлора и альдегидов",
    "Имеет приятный запах",
  ],
  specifications: [
    {
      name: "Действующее вещество",
      value: "Четвертичные аммониевые соединения",
    },
    { name: "Форма выпуска", value: "Жидкий концентрат" },
    { name: "Срок годности", value: "3 года" },
    { name: "pH", value: "7.0-8.5" },
    { name: "Класс опасности", value: "4 (малоопасное вещество)" },
    {
      name: "Спектр действия",
      value: "Бактерицидный, вирулицидный, фунгицидный",
    },
  ],
  relatedProducts: [
    { id: 2, name: "ДезоПроф Актив", price: 850, image: "/product-2.jpg" },
    { id: 3, name: "ДезоПроф Хлор", price: 650, image: "/product-3.jpg" },
    { id: 4, name: "ДезоПроф Антисептик", price: 450, image: "/product-4.jpg" },
  ],
};

export default function ProductDetailPage() {
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
          <ProductActions />
        </div>
      </div>
      <ProductTabs
        features={product.features}
        specifications={product.specifications}
      />
    </div>
  );
}
