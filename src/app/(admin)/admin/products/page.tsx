"use client";

import { useState } from "react";
import { Plus, Loader2, Search, Trash2, Pencil, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  ProductForm,
  type ProductWithImages,
} from "@/features/admin/product-form/product-form";

// Define the Product type
interface Product extends ProductWithImages {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// This would be your actual hook in a real application
const useGetProducts = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Смартфон XYZ Pro",
      category: "electronics",
      description: "Мощный смартфон с отличной камерой и производительностью.",
      images: ["/modern-communication-hub.png"],
      isInStock: true,
      isPopular: true,
      price: 49999.99,
      createdAt: new Date("2023-05-15"),
      updatedAt: new Date("2023-06-01"),
    },
    {
      id: 2,
      name: "Ноутбук UltraBook",
      category: "electronics",
      description: "Тонкий и легкий ноутбук для работы и развлечений.",
      images: ["/modern-workspace.png"],
      isInStock: true,
      isPopular: false,
      price: 89999.99,
      createdAt: new Date("2023-04-10"),
      updatedAt: new Date("2023-04-10"),
    },
    {
      id: 3,
      name: "Кроссовки SportRun",
      category: "clothing",
      description: "Удобные кроссовки для бега и повседневной носки.",
      images: ["/diverse-sneaker-collection.png"],
      isInStock: false,
      isPopular: true,
      price: 5999.99,
      createdAt: new Date("2023-03-22"),
      updatedAt: new Date("2023-03-25"),
    },
    {
      id: 4,
      name: "Кофемашина BaristaPro",
      category: "home",
      description:
        "Автоматическая кофемашина для приготовления различных видов кофе.",
      images: ["/stainless-steel-coffee-maker.png"],
      isInStock: true,
      isPopular: true,
      price: 29999.99,
      createdAt: new Date("2023-02-18"),
      updatedAt: new Date("2023-02-20"),
    },
    {
      id: 5,
      name: "Фитнес-браслет ActiveLife",
      category: "electronics",
      description: "Умный браслет для отслеживания активности и здоровья.",
      images: ["/wrist-activity-monitor.png"],
      isInStock: true,
      isPopular: false,
      price: 3999.99,
      createdAt: new Date("2023-01-05"),
      updatedAt: new Date("2023-01-10"),
    },
  ]);

  const addProduct = (product: ProductWithImages) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newProduct: Product = {
        ...product,
        id: Math.max(0, ...products.map((p) => p.id)) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProducts([newProduct, ...products]);
      setLoading(false);
      toast({
        title: "Продукт добавлен",
        description: `Продукт "${product.name}" успешно добавлен.`,
      });
    }, 500);
  };

  const updateProduct = (id: number, updatedProduct: ProductWithImages) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, ...updatedProduct, updatedAt: new Date() }
            : product
        )
      );
      setLoading(false);
      toast({
        title: "Продукт обновлен",
        description: `Продукт "${updatedProduct.name}" успешно обновлен.`,
      });
    }, 500);
  };

  const deleteProduct = (id: number) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const productToDelete = products.find((p) => p.id === id);
      setProducts(products.filter((product) => product.id !== id));
      setLoading(false);
      if (productToDelete) {
        toast({
          title: "Продукт удален",
          description: `Продукт "${productToDelete.name}" успешно удален.`,
        });
      }
    }, 500);
  };

  return { products, loading, addProduct, updateProduct, deleteProduct };
};

export default function ProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useGetProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (productData: ProductWithImages) => {
    addProduct(productData);
    setAddDialogOpen(false);
  };

  const handleUpdateProduct = (productData: ProductWithImages) => {
    if (currentProduct) {
      updateProduct(currentProduct.id, productData);
      setEditDialogOpen(false);
      setCurrentProduct(null);
    }
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setEditDialogOpen(true);
  };

  const categoryMap: Record<string, string> = {
    electronics: "Электроника",
    clothing: "Одежда",
    home: "Товары для дома",
    beauty: "Красота и здоровье",
    sports: "Спорт и отдых",
    books: "Книги",
    other: "Другое",
  };

  return (
    <div className="flex justify-center py-10">
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Продукты</h1>
            <p className="mt-2 text-muted-foreground">
              Управление каталогом продуктов
            </p>
          </div>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить продукт
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Добавить новый продукт</DialogTitle>
                <DialogDescription>
                  Заполните форму ниже, чтобы добавить новый продукт в каталог.
                </DialogDescription>
              </DialogHeader>
              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск продуктов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center my-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Продукты не найдены. Попробуйте изменить параметры поиска или
              добавьте новый продукт.
            </p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Продукт</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Наличие</TableHead>
                    <TableHead>Популярный</TableHead>
                    <TableHead className="w-[80px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                            {product.images.length > 0 ? (
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                                Нет фото
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {categoryMap[product.category] || product.category}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                        }).format(product.price)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.isInStock ? "default" : "secondary"}
                        >
                          {product.isInStock ? "В наличии" : "Нет в наличии"}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.isPopular ? "Да" : "Нет"}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(product)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Редактировать</span>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Удалить</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Удалить продукт?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Вы уверены, что хотите удалить продукт "
                                  {product.name}"? Это действие нельзя отменить.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteProduct(product.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Удалить
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Edit Product Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Редактировать продукт</DialogTitle>
              <DialogDescription>
                Внесите изменения в информацию о продукте.
              </DialogDescription>
            </DialogHeader>
            {currentProduct && (
              <ProductForm
                onSubmit={handleUpdateProduct}
                initialData={currentProduct}
                isEditing={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
