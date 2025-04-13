import { Button } from "@/components/ui/button";
import { ProductCard } from "@/entities/product/ui/product-card";

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
          <ProductCard product={product} />
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
