"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Trash2, Upload, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  ProductWithImages,
  Product,
} from "@/entities/product/dto/product.dto";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const itemSchema = z.object({
  price: z.coerce
    .number()
    .min(0, { message: "Цена не может быть отрицательной" }),
  volume: z.string().min(1, { message: "Укажите объем" }),
});

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Название должно содержать не менее 2 символов",
  }),
  category: z.string().min(1, {
    message: "Выберите категорию",
  }),
  description: z.string().min(10, {
    message: "Описание должно содержать не менее 10 символов",
  }),
  items: z
    .array(itemSchema)
    .min(1, { message: "Добавьте хотя бы один вариант товара" }),
  expiry: z.string().optional(),
  isInStock: z.boolean(),
  isPopular: z.boolean(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductWithImages) => void;
  initialData?: Product;
  isEditing?: boolean;
  isSubmitting?: boolean;
  maxHeight?: string | number;
}

export function ProductForm({
  onSubmit,
  initialData,
  isEditing = false,
  isSubmitting = false,
  maxHeight = "70vh",
}: ProductFormProps) {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { data: categories = [] } = useCategoriesQuery();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      items: [{ price: 0, volume: "" }],
      expiry: "",
      isInStock: true,
      isPopular: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        category: initialData.category || "",
        description: initialData.description || "",
        items: initialData.items
          ? JSON.parse(initialData.items)
          : [{ price: 0, volume: "" }],
        expiry: initialData.expiry || "",
        isInStock: initialData.isInStock ?? true,
        isPopular: initialData.isPopular ?? false,
      });
      setImageUrls(initialData.images || []);
    }
  }, [initialData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newUrls: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        form.setError("root", {
          message: `Файл ${file.name} слишком большой. Макс. размер 5MB.`,
        });
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        form.setError("root", {
          message: `Неподдерживаемый формат файла ${file.name}.`,
        });
        return;
      }
      newFiles.push(file);
      newUrls.push(URL.createObjectURL(file));
    });

    setNewImages((prev) => [...prev, ...newFiles]);
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number, url: string) => {
    // If it's a blob URL, it corresponds to a new file
    if (url.startsWith("blob:")) {
      const newImageIndex = imageUrls
        .filter((u) => u.startsWith("blob:"))
        .indexOf(url);
      if (newImageIndex > -1) {
        setNewImages((prev) => prev.filter((_, i) => i !== newImageIndex));
      }
      URL.revokeObjectURL(url);
    }
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: ProductFormValues) => {
    if (!isEditing && newImages.length === 0) {
      form.setError("root", {
        message: "Добавьте хотя бы одно изображение продукта",
      });
      return;
    }

    try {
      const formData = new FormData();

      // Append all data except images
      const { items, ...restOfData } = data;
      Object.entries(restOfData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Stringify and append items
      formData.append("items", JSON.stringify(items));

      // Append new images
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      // For editing, also send existing image URLs if you need to handle deletions on the backend
      if (isEditing) {
        const existingImages = imageUrls.filter(
          (url) => !url.startsWith("blob:")
        );
        existingImages.forEach((url) => {
          formData.append("existingImages", url);
        });
      }

      await onSubmit({
        formData,
        name: data.name,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", { message: "Ошибка при отправке формы" });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col h-full"
        >
          <div
            className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6"
            style={{
              maxHeight: maxHeight,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(155, 155, 155, 0.5) transparent",
            }}
          >
            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите название продукта"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категория</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.name}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Введите описание продукта"
                        className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label>Изображения</Label>
                <div className="mt-2">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 border-border hover:bg-background/80"
                  >
                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                      <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">
                          Нажмите для загрузки
                        </span>{" "}
                        или перетащите
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP (макс. 5MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="overflow-hidden rounded-lg aspect-square bg-muted">
                          <Image
                            width={100}
                            height={100}
                            src={url || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index, url)}
                          className="absolute cursor-pointer top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label>Варианты товара (цена и объем)</Label>
                <div className="space-y-4 mt-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-end gap-4 p-4 border rounded-lg"
                    >
                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Цена</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                  ₸
                                </span>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-8"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.volume`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Объем</FormLabel>
                            <FormControl>
                              <Input placeholder="1 л, 500 мл" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => append({ price: 0, volume: "" })}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Добавить вариант
                </Button>
                <FormField
                  control={form.control}
                  name="items"
                  render={() => <FormMessage className="mt-2" />}
                />
              </div>

              <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Срок годности</FormLabel>
                    <FormControl>
                      <Input placeholder="3 года, 2 месяца" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="isInStock"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">В наличии</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Популярный товар
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive mt-4">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6 pt-4 border-t bg-background">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {isEditing ? "Сохранить изменения" : "Добавить продукт"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
