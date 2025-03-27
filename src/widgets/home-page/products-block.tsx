import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

// Sample product data
const products = [
  {
    id: 1,
    title: "Дезинфицирующее средство Spell",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300",
    category: "Дезинфицирующие средства",
    isNew: true,
    isPopular: false,
    inStock: true,
  },
  {
    id: 2,
    title: "Антисептик для рук Sanitelle",
    price: 1500,
    image: "/placeholder.svg?height=300&width=300",
    category: "Антисептические средства",
    isNew: false,
    isPopular: true,
    inStock: true,
  },
  {
    id: 3,
    title: "Моющее средство ProClean",
    price: 2800,
    image: "/placeholder.svg?height=300&width=300",
    category: "Моющие средства",
    isNew: false,
    isPopular: false,
    inStock: true,
  },
  {
    id: 4,
    title: "Дезинфицирующие салфетки MediWipes",
    price: 950,
    image: "/placeholder.svg?height=300&width=300",
    category: "Дезинфицирующие средства",
    isNew: true,
    isPopular: false,
    inStock: false,
  },
  {
    id: 5,
    title: "Концентрат для дезинфекции Dezex",
    price: 4500,
    image: "/placeholder.svg?height=300&width=300",
    category: "Дезинфицирующие средства",
    isNew: false,
    isPopular: true,
    inStock: true,
  },
  {
    id: 6,
    title: "Средство для обработки поверхностей SurfClean",
    price: 2100,
    image: "/placeholder.svg?height=300&width=300",
    category: "Моющие средства",
    isNew: false,
    isPopular: false,
    inStock: true,
  },
  {
    id: 7,
    title: "Антибактериальный гель HandSafe",
    price: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "Антисептические средства",
    isNew: false,
    isPopular: false,
    inStock: true,
  },
  {
    id: 8,
    title: "Дезинфицирующий спрей AeroClean",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300",
    category: "Дезинфицирующие средства",
    isNew: true,
    isPopular: false,
    inStock: true,
  },
];

export function ProductsBlock() {
  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-KZ", {
      style: "currency",
      currency: "KZT",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">Популярные товары</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Профессиональные дезинфицирующие и моющие средства высокого качества
          для различных сфер применения
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group overflow-hidden transition-all hover:shadow-md"
          >
            <div className="relative">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
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
                  <Badge
                    variant="outline"
                    className="bg-accent text-accent-foreground"
                  >
                    Популярное
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="p-4 pb-0">
              <Link
                href={`/products/${product.id}`}
                className="hover:underline"
              >
                <h3 className="line-clamp-2 min-h-[3rem] text-lg font-medium">
                  {product.title}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground">
                {product.category}
              </p>
            </CardHeader>

            <CardContent className="p-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">
                  {formatPrice(product.price)}
                </div>
                {!product.inStock && (
                  <Badge variant="outline" className="text-muted-foreground">
                    Нет в наличии
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 p-4 pt-0">
              <Button className="w-full" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />В корзину
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Смотреть все товары
        </Button>
      </div>
    </div>
  );
}
