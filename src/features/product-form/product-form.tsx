"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Trash2, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Define the product schema with required fields
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
  price: z.coerce
    .number()
    .min(0.01, { message: "Цена должна быть больше 0" })
    .multipleOf(0.01, {
      message: "Цена должна быть указана с точностью до копеек",
    }),
  isInStock: z.boolean(),
  isPopular: z.boolean(),
});

// Define the type for form values
export type ProductFormValues = z.infer<typeof productFormSchema>;

// Define the type for the product with images
export interface ProductWithImages extends ProductFormValues {
  images: string[];
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const defaultValues: ProductFormValues = {
  name: "",
  category: "",
  description: "",
  price: 0,
  isInStock: true,
  isPopular: false,
};

interface ProductFormProps {
  onSubmit: (data: ProductWithImages) => void;
  initialData?: ProductWithImages;
  isEditing?: boolean;
}

export function ProductForm({
  onSubmit,
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with proper types
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      isInStock:
        initialData?.isInStock !== undefined ? initialData.isInStock : true,
      isPopular:
        initialData?.isPopular !== undefined ? initialData.isPopular : false,
    },
  });

  // Set initial images if editing
  useEffect(() => {
    if (initialData?.images) {
      setImageUrls(initialData.images);
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newUrls: string[] = [];

    Array.from(files).forEach((file) => {
      // Validate file size and type
      if (file.size > MAX_FILE_SIZE) {
        console.error(`File ${file.name} is too large. Max size is 5MB.`);
        return;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        console.error(
          `File ${file.name} has unsupported format. Supported formats: JPEG, PNG, WebP.`
        );
        return;
      }

      newFiles.push(file);
      newUrls.push(URL.createObjectURL(file));
    });

    setImages((prev) => [...prev, ...newFiles]);
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    // Only revoke if it's a blob URL (not an existing image URL)
    if (imageUrls[index].startsWith("blob:")) {
      URL.revokeObjectURL(imageUrls[index]);
    }

    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: ProductFormValues) => {
    if (imageUrls.length === 0) {
      form.setError("root", {
        message: "Добавьте хотя бы одно изображение продукта",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would upload images here
      // For now, we'll just pass the URLs
      await onSubmit({
        ...data,
        images: imageUrls,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
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
                    <Input placeholder="Введите название продукта" {...field} />
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
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electronics">Электроника</SelectItem>
                      <SelectItem value="clothing">Одежда</SelectItem>
                      <SelectItem value="home">Товары для дома</SelectItem>
                      <SelectItem value="beauty">Красота и здоровье</SelectItem>
                      <SelectItem value="sports">Спорт и отдых</SelectItem>
                      <SelectItem value="books">Книги</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
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
                  <Textarea
                    placeholder="Введите описание продукта"
                    className="min-h-24 resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor="images">Изображения</Label>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 border-border hover:bg-background/80"
                >
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Нажмите для загрузки</span>{" "}
                      или перетащите файлы
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
            </div>

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="overflow-hidden rounded-lg aspect-square bg-muted">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      ₽
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="isInStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">В наличии</FormLabel>
                    <FormDescription>
                      Товар доступен для покупки
                    </FormDescription>
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
                    <FormDescription>
                      Отображать в разделе популярных товаров
                    </FormDescription>
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

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Сохранить изменения" : "Добавить продукт"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
