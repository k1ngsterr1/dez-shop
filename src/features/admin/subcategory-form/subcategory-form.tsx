"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import type {
  CreateSubcategoryDto,
  Subcategory,
  UpdateSubcategoryDto,
} from "@/entities/subcategory/dto/subcategory.dto";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import type { Category } from "@/entities/category/dto/category.dto";

const subcategoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Название должно содержать не менее 2 символов",
  }),
  categoryId: z.coerce.number().min(1, {
    message: "Выберите категорию",
  }),
});

type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>;

interface SubcategoryFormProps {
  onSubmit: (
    data: CreateSubcategoryDto | UpdateSubcategoryDto
  ) => Promise<void>;
  initialData?: Subcategory;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

export function SubcategoryForm({
  onSubmit,
  initialData,
  isEditing = false,
  isSubmitting = false,
}: SubcategoryFormProps) {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategoriesQuery();

  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      name: "",
      categoryId: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        categoryId: initialData.categoryId || 0,
      });
    }
  }, [initialData, form]);

  const handleFormSubmit = async (data: SubcategoryFormValues) => {
    await onSubmit(data);
    if (!isEditing) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название подкатегории</FormLabel>
              <FormControl>
                <Input placeholder="Введите название подкатегории" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Родительская категория</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : ""}
                disabled={isLoadingCategories}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingCategories
                          ? "Загрузка категорий..."
                          : "Выберите категорию"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <DialogFooter className="pt-4">
          <Button type="submit" disabled={isSubmitting || isLoadingCategories}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Сохранить изменения" : "Добавить подкатегорию"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
