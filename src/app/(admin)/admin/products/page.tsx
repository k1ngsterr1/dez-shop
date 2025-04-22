"use client";

import { useState } from "react";
import { Plus, Search, Trash2, Pencil, MoreHorizontal } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useMobile } from "@/hooks/use-is-mobile";

export default function ProductsPage() {
  const { data: products = [], isLoading, refetch } = useProductsQuery();
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();
  const { toast } = useToast();
  const isMobile = useMobile();

  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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
      refetch();
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

  // Skeleton loader component for table rows
  const ProductRowSkeleton = () => (
    <TableRow className="animate-pulse">
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-5 w-[150px]" />
        </div>
      </TableCell>
      {!isMobile && (
        <>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-[100px]" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-[80px]" />
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <Skeleton className="h-5 w-[60px]" />
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <Skeleton className="h-5 w-[100px]" />
          </TableCell>
        </>
      )}
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-6 w-[90px] rounded-full" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="h-5 w-[40px]" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-2">
          {isMobile ? (
            <Skeleton className="h-8 w-8 rounded-md" />
          ) : (
            <>
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  // Mobile product card component
  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="mb-4 sm:hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-md bg-muted overflow-hidden">
              {product.images.length > 0 ? (
                <Image
                  width={100}
                  height={100}
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
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Действия</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEditDialog(product)}>
                <Pencil className="mr-2 h-4 w-4" />
                Редактировать
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Удалить продукт?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Вы уверены, что хотите удалить продукт {product.name}? Это
                      действие нельзя отменить.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Цена:</p>
            <p className="font-medium">
              {new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              }).format(product.price)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Объем:</p>
            <p>{product.volume || "—"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Срок годности:</p>
            <p>{product.expiry || "—"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Статус:</p>
            <Badge
              className="mt-1 !text-white"
              variant={product.isInStock ? "default" : "secondary"}
            >
              {product.isInStock ? "В наличии" : "Нет в наличии"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Mobile skeleton card
  const ProductCardSkeleton = () => (
    <Card className="mb-4 sm:hidden animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div>
              <Skeleton className="h-5 w-[120px] mb-2" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <Skeleton className="h-4 w-[60px] mb-2" />
            <Skeleton className="h-5 w-[80px]" />
          </div>
          <div>
            <Skeleton className="h-4 w-[60px] mb-2" />
            <Skeleton className="h-5 w-[60px]" />
          </div>
          <div>
            <Skeleton className="h-4 w-[90px] mb-2" />
            <Skeleton className="h-5 w-[70px]" />
          </div>
          <div>
            <Skeleton className="h-4 w-[60px] mb-2" />
            <Skeleton className="h-6 w-[90px] rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Продукты
            </h1>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              Управление каталогом продуктов
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                <span className="sm:inline">Добавить продукт</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
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
        <div className="mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск продуктов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile view - cards */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={`mobile-skeleton-${index}`} />
          ))
        ) : filteredProducts.length === 0 ? (
          <Card className="sm:hidden">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Продукты не найдены.</p>
              <p className="text-sm mt-1">
                Попробуйте изменить параметры поиска или добавьте новый продукт.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={`mobile-${product.id}`} product={product} />
          ))
        )}

        {/* Desktop view - table */}
        <div className="hidden sm:block">
          <Card>
            <CardContent className="p-0 sm:p-5">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Продукт</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Категория
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Цена
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Объем (л)
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Срок годности
                      </TableHead>
                      <TableHead>Наличие</TableHead>
                      <TableHead>Популярный</TableHead>
                      <TableHead className="w-[80px] text-right">
                        Действия
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      // Skeleton loading state
                      Array.from({ length: 6 }).map((_, index) => (
                        <ProductRowSkeleton key={`desktop-skeleton-${index}`} />
                      ))
                    ) : filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <p>Продукты не найдены.</p>
                            <p className="text-sm">
                              Попробуйте изменить параметры поиска или добавьте
                              новый продукт.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      // Actual data
                      filteredProducts.map((product) => (
                        <TableRow key={`desktop-${product.id}`}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                                {product.images.length > 0 ? (
                                  <Image
                                    width={100}
                                    height={100}
                                    src={
                                      product.images[0] || "/placeholder.svg"
                                    }
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                                    Нет фото
                                  </div>
                                )}
                              </div>
                              <span className="font-medium">
                                {product.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.category}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                            }).format(product.price)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {product.volume || "—"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {product.expiry || "—"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className="!text-white"
                              variant={
                                product.isInStock ? "default" : "secondary"
                              }
                            >
                              {product.isInStock
                                ? "В наличии"
                                : "Нет в наличии"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {product.isPopular ? "Да" : "Нет"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              {isMobile ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Действия</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => openEditDialog(product)}
                                    >
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Редактировать
                                    </DropdownMenuItem>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                          onSelect={(e) => e.preventDefault()}
                                          className="text-destructive"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Удалить
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Удалить продукт?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Вы уверены, что хотите удалить
                                            продукт {product.name}? Это действие
                                            нельзя отменить.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Отмена
                                          </AlertDialogCancel>
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
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ) : (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openEditDialog(product)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">
                                      Редактировать
                                    </span>
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
                                          Вы уверены, что хотите удалить продукт{" "}
                                          {product.name}? Это действие нельзя
                                          отменить.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Отмена
                                        </AlertDialogCancel>
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
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
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
