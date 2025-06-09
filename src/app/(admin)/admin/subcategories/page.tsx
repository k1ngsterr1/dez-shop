"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  MoreHorizontal,
  ListFilter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { SubcategoryForm } from "@/features/admin/subcategory-form/subcategory-form";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import { useCreateSubcategoryMutation } from "@/entities/subcategory/hooks/mutation/use-create-subcategory.mutation";
import { useUpdateSubcategoryMutation } from "@/entities/subcategory/hooks/mutation/use-update-subcategory.mutation";
import { useDeleteSubcategoryMutation } from "@/entities/subcategory/hooks/mutation/use-delete-subcategory.mutation";
import type {
  Subcategory,
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from "@/entities/subcategory/dto/subcategory.dto";
import { useSubcategoriesQuery } from "@/entities/subcategory/hooks/query/use-get-subcategories.query"; // Corrected import path

export default function SubcategoriesPage() {
  const {
    data: subcategoriesData,
    isLoading: isLoadingSubcategories,
    error: subcategoriesError,
    refetch: refetchSubcategories,
  } = useSubcategoriesQuery();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategoriesQuery();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (subcategoriesData) setSubcategories(subcategoriesData);
  }, [subcategoriesData]);

  useEffect(() => {
    if (categoriesData) setCategories(categoriesData);
  }, [categoriesData]);

  const createSubcategoryMutation = useCreateSubcategoryMutation();
  const updateSubcategoryMutation = useUpdateSubcategoryMutation();
  const deleteSubcategoryMutation = useDeleteSubcategoryMutation();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSubcategory, setCurrentSubcategory] =
    useState<Subcategory | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

  const categoryMap = useMemo(() => {
    const map = new Map<number, string>();
    categories.forEach((cat) => map.set(cat.id, cat.name));
    return map;
  }, [categories]);

  const filteredSubcategories = useMemo(() => {
    let result = subcategories;
    if (categoryFilter) {
      result = result.filter((sub) => sub.categoryId === categoryFilter);
    }
    return result.filter(
      (subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryMap
          .get(subcategory.categoryId)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [subcategories, searchTerm, categoryMap, categoryFilter]);

  const handleAddSubcategory = async (
    data: CreateSubcategoryDto | UpdateSubcategoryDto
  ) => {
    const createData = data as CreateSubcategoryDto;
    try {
      await createSubcategoryMutation.mutateAsync(createData);
      toast({
        title: "Подкатегория добавлена",
        description: `Подкатегория "${createData.name}" успешно добавлена.`,
      });
      setAddDialogOpen(false);
      await refetchSubcategories();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить подкатегорию.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSubcategory = async (
    data: CreateSubcategoryDto | UpdateSubcategoryDto
  ) => {
    const updateData = data as UpdateSubcategoryDto;
    if (currentSubcategory) {
      try {
        await updateSubcategoryMutation.mutateAsync({
          id: currentSubcategory.id,
          data: updateData,
        });
        toast({
          title: "Подкатегория обновлена",
          description: `Подкатегория "${
            updateData.name || currentSubcategory.name
          }" успешно обновлена.`,
        });
        setEditDialogOpen(false);
        setCurrentSubcategory(null);
        await refetchSubcategories();
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить подкатегорию.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteSubcategory = async (id: number) => {
    try {
      await deleteSubcategoryMutation.mutateAsync(id);
      toast({
        title: "Подкатегория удалена",
        description: "Подкатегория успешно удалена.",
      });
      await refetchSubcategories();
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          "Не удалось удалить подкатегорию. Возможно, она используется продуктами.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (subcategory: Subcategory) => {
    setCurrentSubcategory(subcategory);
    setEditDialogOpen(true);
  };

  const RowSkeleton = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-3/4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-1/2" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-8 w-8" /> <Skeleton className="h-8 w-8" />
        </div>
      </TableCell>
    </TableRow>
  );

  if (subcategoriesError) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8 text-destructive">
        Ошибка загрузки подкатегорий: {subcategoriesError.message}
      </div>
    );
  }

  return (
    // Changed from "container mx-auto..." to "w-full max-w-7xl mx-auto..." for consistency
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Подкатегории
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Управление подкатегориями продуктов
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" /> Добавить подкатегорию
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Новая подкатегория</DialogTitle>
              <DialogDescription>
                Заполните данные для новой подкатегории.
              </DialogDescription>
            </DialogHeader>
            <SubcategoryForm
              onSubmit={handleAddSubcategory}
              isSubmitting={createSubcategoryMutation.isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию или категории..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto">
                <ListFilter className="mr-2 h-4 w-4" /> Фильтр по категории
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Выберите категорию</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={!categoryFilter}
                  onCheckedChange={() => setCategoryFilter(null)}
                >
                  Все категории
                </DropdownMenuCheckboxItem>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    checked={categoryFilter === category.id}
                    onCheckedChange={() =>
                      setCategoryFilter((prev) =>
                        prev === category.id ? null : category.id
                      )
                    }
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название подкатегории</TableHead>
                  <TableHead>Родительская категория</TableHead>
                  <TableHead className="text-right w-[100px]">
                    Действия
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingSubcategories || isLoadingCategories ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <RowSkeleton key={i} />
                  ))
                ) : filteredSubcategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      Подкатегории не найдены.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubcategories.map((subcategory) => (
                    <TableRow key={subcategory.id}>
                      <TableCell className="font-medium">
                        {subcategory.name}
                      </TableCell>
                      <TableCell>
                        {categoryMap.get(subcategory.categoryId) ||
                          "Неизвестная категория"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Действия</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openEditDialog(subcategory)}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Редактировать
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-destructive hover:!bg-destructive/10"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Удалить
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Удалить подкатегорию?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Вы уверены, что хотите удалить подкатегорию
                                    "{subcategory.name}"? Это действие нельзя
                                    отменить.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteSubcategory(subcategory.id)
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать подкатегорию</DialogTitle>
            <DialogDescription>Измените данные подкатегории.</DialogDescription>
          </DialogHeader>
          {currentSubcategory && (
            <SubcategoryForm
              onSubmit={handleUpdateSubcategory}
              initialData={currentSubcategory}
              isEditing={true}
              isSubmitting={updateSubcategoryMutation.isLoading}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
