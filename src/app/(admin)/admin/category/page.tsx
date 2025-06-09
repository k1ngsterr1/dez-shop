"use client";

import { useState } from "react";
import { Plus, Search, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { useCreateCategoryMutation } from "@/entities/category/hooks/mutation/use-create-category.mutation";
import { useUpdateCategoryMutation } from "@/entities/category/hooks/mutation/use-update-category.mutation";
import { useDeleteCategoryMutation } from "@/entities/category/hooks/mutation/use-delete-category.mutation";
import type { Category } from "@/entities/category/dto/category.dto";
import { CategoryForm } from "@/features/admin/category-form/category-form";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPage() {
  const { data: categories = [], isLoading, refetch } = useCategoriesQuery();
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const filteredCategories = categories.filter((category: Category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = async (categoryData: { name: string }) => {
    try {
      // @ts-ignore
      await createCategoryMutation.mutate(categoryData);
      toast({
        title: "Категория добавлена",
        description: `Категория "${categoryData.name}" успешно добавлена.`,
      });
      setAddDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error with adding category:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить категорию",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCategory = async (categoryData: { name: string }) => {
    if (currentCategory) {
      try {
        // @ts-ignore
        await updateCategoryMutation.mutate({
          id: currentCategory.id,
          data: categoryData,
        });
        toast({
          title: "Категория обновлена",
          description: `Категория "${categoryData.name}" успешно обновлена.`,
        });
        setEditDialogOpen(false);
        setCurrentCategory(null);
        refetch();
      } catch (error) {
        console.error("Error with updating category:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обновить категорию",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      // @ts-ignore
      await deleteCategoryMutation.mutate(id);
      toast({
        title: "Категория удалена",
        description: "Категория успешно удалена.",
      });
      refetch();
    } catch (error) {
      console.error("Error with deleting category:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить категорию",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setEditDialogOpen(true);
  };

  const TableRowSkeleton = () => (
    <TableRow className="animate-pulse">
      <TableCell>
        <Skeleton className="h-5 w-[180px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-[100px]" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Категории</h1>
            <p className="mt-2 text-muted-foreground">
              Управление категориями продуктов
            </p>
          </div>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить категорию
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Добавить новую категорию</DialogTitle>
                <DialogDescription>
                  Введите название для новой категории продуктов.
                </DialogDescription>
              </DialogHeader>
              <CategoryForm
                onSubmit={handleAddCategory}
                isSubmitting={createCategoryMutation.isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск категорий..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-5">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Дата создания</TableHead>
                  <TableHead>Дата обновления</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Действия
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRowSkeleton key={index} />
                  ))
                ) : filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <p>Категории не найдены.</p>
                        <p className="text-sm">
                          Попробуйте изменить параметры поиска или добавьте
                          новую категорию.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category: Category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell>
                        {new Date(category.createdAt).toLocaleDateString(
                          "ru-RU"
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(category.updatedAt).toLocaleDateString(
                          "ru-RU"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(category)}
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
                                  Удалить категорию?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Вы уверены, что хотите удалить категорию{" "}
                                  {category.name}? Это действие нельзя отменить.
                                  Удаление категории может повлиять на продукты,
                                  связанные с ней.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteCategory(category.id)
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
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Редактировать категорию</DialogTitle>
              <DialogDescription>
                Измените название категории.
              </DialogDescription>
            </DialogHeader>
            {currentCategory && (
              <CategoryForm
                onSubmit={handleUpdateCategory}
                initialData={currentCategory}
                isEditing={true}
                isSubmitting={updateCategoryMutation.isLoading}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
