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
import { ProductForm } from "@/features/admin/product-form/product-form";
import { useProductsQuery } from "@/entities/product/hooks/query/use-get-products.query";
import { useCreateProductMutation } from "@/entities/product/hooks/mutation/use-create-product.mutation";
import { useUpdateProductMutation } from "@/entities/product/hooks/mutation/use-update-product.mutation";
import { useDeleteProductMutation } from "@/entities/product/hooks/mutation/use-delete-product.mutation";
import type {
  Product,
  ProductWithImages,
} from "@/entities/product/dto/product.dto";
import Image from "next/image";

export default function ProductsPage() {
  // Custom hooks
  const { data: products = [], isLoading, refetch } = useProductsQuery();
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();
  const { toast } = useToast();

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async (productData: ProductWithImages) => {
    try {
      await createProductMutation.mutate(productData);
      toast({
        title: "Продукт добавлен",
        description: `Продукт "${productData.name}" успешно добавлен.`,
      });
      setAddDialogOpen(false);
      refetch(); // Refresh the products list
    } catch (error) {
      console.error("Error with adding product:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить продукт",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (productData: any) => {
    if (currentProduct) {
      try {
        await updateProductMutation.mutate(currentProduct.id, productData);
        toast({
          title: "Продукт обновлен",
          description: `Продукт "${productData.name}" успешно обновлен.`,
        });
        setEditDialogOpen(false);
        setCurrentProduct(null);
        refetch(); // Refresh the products list
      } catch (error) {
        console.error("Error with updating product:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обновить продукт",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProductMutation.mutate(id);
      toast({
        title: "Продукт удален",
        description: "Продукт успешно удален.",
      });
      refetch(); // Refresh the products list
    } catch (error) {
      console.error("Error with deleting product:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить продукт",
        variant: "destructive",
      });
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
    <div className="w-full">
      <div className="max-w-5xl w-full mx-auto">
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
              <ProductForm
                onSubmit={handleAddProduct}
                isSubmitting={createProductMutation.isLoading}
              />
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

        {isLoading && (
          <div className="flex justify-center my-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 ? (
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
                    <TableHead>Объем (л)</TableHead>
                    <TableHead>Срок годности</TableHead>
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
                              <Image
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
                      <TableCell>{product.volume || "—"}</TableCell>
                      <TableCell>{product.expiry || "—"}</TableCell>
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
                                  Вы уверены, что хотите удалить продукт
                                  {product.name}? Это действие нельзя отменить.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
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
                isSubmitting={updateProductMutation.isLoading}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
