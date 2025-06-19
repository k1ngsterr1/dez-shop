"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useFieldArray,
  type Control,
  type SubmitHandler,
} from "react-hook-form"; // Added Control, SubmitHandler
import { z } from "zod";
import { Trash2, Upload, Loader2, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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
  Item,
} from "@/entities/product/dto/product.dto";
import { useCategoriesQuery } from "@/entities/category/hooks/query/use-get-categories.query";
import type { Category } from "@/entities/category/dto/category.dto";
import Image from "next/image";
import { useSubcategoriesQuery } from "@/entities/subcategory/hooks/query/use-get-subcategories.query";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const itemSchema = z.object({
  price: z.coerce.number(),
  volume: z.string().min(1, { message: "Укажите объем" }),
});

// Adjusting to support multiple categories and subcategories
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Название должно содержать не менее 2 символов",
  }),
  categoryIds: z.array(z.string()).min(1, {
    message: "Выберите хотя бы одну категорию",
  }),
  subcategoryIds: z.array(z.string()), // Can be empty array
  description: z.string().min(10, {
    message: "Описание должно содержать не менее 10 символов",
  }),
  items: z
    .array(itemSchema)
    .min(1, { message: "Добавьте хотя бы один вариант товара" }),
  expiry: z.string().optional(), // This can be string | undefined
  isInStock: z.boolean(),
  isPopular: z.boolean(),
});

// This type is inferred from productFormSchema. `subcategory` will be `string`.
type ProductFormValuesInternal = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductWithImages) => Promise<void>;
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
  const [existingImageUrlsState, setExistingImageUrlsState] = useState<
    string[]
  >([]);

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategoriesQuery();
  const { data: allSubcategories = [], isLoading: isLoadingSubcategories } =
    useSubcategoriesQuery();

  const form = useForm<ProductFormValuesInternal>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      categoryIds: [],
      subcategoryIds: [],
      description: "",
      items: [{ price: 0, volume: "" }],
      expiry: undefined, // Explicitly undefined for optional field
      isInStock: true,
      isPopular: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const selectedCategoryIds = form.watch("categoryIds");

  const selectedCategoryObjects = useMemo(() => {
    if (!selectedCategoryIds.length || isLoadingCategories) return [];
    return categories.filter((cat) =>
      selectedCategoryIds.some((id) => cat.id.toString() === id)
    );
  }, [selectedCategoryIds, categories, isLoadingCategories]);

  const filteredSubcategories = useMemo(() => {
    if (selectedCategoryObjects.length === 0 || isLoadingSubcategories)
      return [];
    if (!Array.isArray(allSubcategories) || allSubcategories.length === 0)
      return [];
    const categoryIds = selectedCategoryObjects.map((cat) => cat.id);
    return allSubcategories.filter((sub) =>
      categoryIds.includes(sub.categoryId)
    );
  }, [selectedCategoryObjects, allSubcategories, isLoadingSubcategories]);

  useEffect(() => {
    if (initialData) {
      let parsedItems: Item[] = [{ price: 0, volume: "" }];
      try {
        if (initialData.items && typeof initialData.items === "string") {
          const parsed = JSON.parse(initialData.items);
          if (Array.isArray(parsed) && parsed.length > 0) parsedItems = parsed;
        } else if (
          Array.isArray(initialData.items) &&
          initialData.items.length > 0
        ) {
          parsedItems = initialData.items as Item[];
        }
      } catch (e) {
        console.error("Failed to parse items from initialData:", e);
      }

      // Get category and subcategory IDs from the arrays
      const categoryIds =
        initialData.categories?.map((cat) => cat.id.toString()) || [];
      const subcategoryIds =
        initialData.subcategories?.map((sub) => sub.id.toString()) || [];
      console.log("HEHEHEHEHEHEHEH", initialData.name, subcategoryIds);

      form.reset({
        name: initialData.name || "",
        categoryIds: categoryIds,
        subcategoryIds: subcategoryIds,
        description: initialData.description || "",
        items: parsedItems,
        expiry: initialData.expiry || undefined,
        isInStock: initialData.isInStock ?? true,
        isPopular: initialData.isPopular ?? false,
      });
      const initialImageUrls = initialData.images || [];
      setImageUrls(initialImageUrls);
      setExistingImageUrlsState(
        initialImageUrls.filter((url) => !url.startsWith("blob:"))
      );
    }
  }, [initialData, form]);

  useEffect(() => {
    // Ждём, когда подкатегории загрузятся
    if (isLoadingSubcategories) return;

    const current = form.getValues("subcategoryIds") || [];

    // Если нет ни одной выбранной категории – сбросить
    if (selectedCategoryIds.length === 0) {
      form.setValue("subcategoryIds", [], { shouldValidate: true });
      return;
    }

    // Иначе — фильтруем существующие
    const valid = current.filter((subId) =>
      filteredSubcategories.some((sub) => sub.id.toString() === subId)
    );

    // Если что-то изменилось – обновляем
    if (valid.length !== current.length) {
      form.setValue("subcategoryIds", valid, { shouldValidate: true });
    }
  }, [
    selectedCategoryIds,
    filteredSubcategories,
    isLoadingSubcategories,
    form,
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const currentImageCount = imageUrls.length;
    const filesToAdd = Array.from(files).slice(
      0,
      Math.max(0, 5 - currentImageCount)
    );
    const tempNewFiles: File[] = [];
    const tempNewUrls: string[] = [];
    filesToAdd.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        form.setError("root.images" as any, {
          message: `Файл ${file.name} слишком большой. Макс. размер 5MB.`,
        });
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        form.setError("root.images" as any, {
          message: `Неподдерживаемый формат файла ${file.name}.`,
        });
        return;
      }
      tempNewFiles.push(file);
      tempNewUrls.push(URL.createObjectURL(file));
    });
    setNewImages((prev) => [...prev, ...tempNewFiles]);
    setImageUrls((prev) => [...prev, ...tempNewUrls]);
    if (form.formState.errors.root?.images) {
      form.clearErrors("root.images" as any);
    }
  };

  const removeImage = (index: number, urlToRemove: string) => {
    setImageUrls((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
    if (urlToRemove.startsWith("blob:")) {
      setNewImages((prevFiles) =>
        prevFiles.filter((file) => URL.createObjectURL(file) !== urlToRemove)
      );
      URL.revokeObjectURL(urlToRemove);
    } else {
      setExistingImageUrlsState((prev) =>
        prev.filter((url) => url !== urlToRemove)
      );
    }
  };

  // Explicitly type `data` parameter for SubmitHandler
  const handleFormSubmit: SubmitHandler<ProductFormValuesInternal> = async (
    data
  ) => {
    if (
      !isEditing &&
      newImages.length === 0 &&
      existingImageUrlsState.length === 0
    ) {
      form.setError("root.images" as any, {
        message: "Добавьте хотя бы одно изображение продукта",
      });
      return;
    }
    form.clearErrors("root.images" as any);

    try {
      // Convert string IDs to numbers
      const categoryIds = data.categoryIds.map((id) => parseInt(id, 10));
      const subcategoryIds = data.subcategoryIds.map((id) => parseInt(id, 10));

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("categoryIds", JSON.stringify(categoryIds));
      formData.append("subcategoryIds", JSON.stringify(subcategoryIds));
      formData.append("description", data.description);
      formData.append("items", JSON.stringify(data.items));
      if (data.expiry) formData.append("expiry", data.expiry);
      formData.append("isInStock", String(data.isInStock));
      formData.append("isPopular", String(data.isPopular));
      newImages.forEach((file) => formData.append("images", file));
      if (isEditing) {
        existingImageUrlsState.forEach((url) =>
          formData.append("existingImages[]", url)
        );
      }

      const submissionObject: ProductWithImages = {
        name: data.name,
        categoryIds: categoryIds,
        subcategoryIds: subcategoryIds,
        description: data.description,
        items: data.items,
        expiry: data.expiry,
        isInStock: data.isInStock,
        isPopular: data.isPopular,
        images: newImages,
        existingImages: isEditing ? existingImageUrlsState : undefined,
        formData: formData,
      };
      await onSubmit(submissionObject);
      if (!isEditing) {
        form.reset();
        setNewImages([]);
        setImageUrls([]);
        setExistingImageUrlsState([]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", { message: "Ошибка при отправке формы" });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Cast form.control if TypeScript still has issues inferring it perfectly */}
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
                  control={form.control as Control<ProductFormValuesInternal>}
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
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категории</FormLabel>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((categoryId) => {
                            const category = categories.find(
                              (cat) => cat.id.toString() === categoryId
                            );
                            return (
                              <div
                                key={categoryId}
                                className="flex items-center bg-secondary px-3 py-1 rounded-md text-sm"
                              >
                                <span>
                                  {category?.name || "Неизвестная категория"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newValue = field.value.filter(
                                      (id) => id !== categoryId
                                    );
                                    field.onChange(newValue);
                                  }}
                                  className="ml-2 text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                isLoadingCategories
                                  ? "Загрузка категорий..."
                                  : field.value.length > 0
                                  ? `Выбрано категорий: ${field.value.length}`
                                  : "Выберите категории"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <div className="p-2 space-y-2 max-h-60 overflow-y-auto">
                              {categories.length > 0 && (
                                <div className="flex gap-2 pb-2 border-b">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const allIds = categories.map((cat) =>
                                        cat.id.toString()
                                      );
                                      field.onChange(allIds);
                                    }}
                                  >
                                    Выбрать все
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => field.onChange([])}
                                  >
                                    Очистить
                                  </Button>
                                </div>
                              )}
                              {categories.map((category) => (
                                <div
                                  key={category.id}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`category-${category.id}`}
                                    checked={field.value.includes(
                                      category.id.toString()
                                    )}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...field.value,
                                          category.id.toString(),
                                        ]);
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            (id) =>
                                              id !== category.id.toString()
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`category-${category.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                  >
                                    {category.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subcategoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подкатегории</FormLabel>
                    <div className="space-y-2">
                      {field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((subcategoryId) => {
                            const subcategory = allSubcategories.find(
                              (sub) => sub.id.toString() === subcategoryId
                            );
                            return (
                              <div
                                key={subcategoryId}
                                className="flex items-center bg-secondary px-3 py-1 rounded-md text-sm"
                              >
                                <span>
                                  {subcategory?.name ||
                                    "Неизвестная подкатегория"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newValue = field.value.filter(
                                      (id) => id !== subcategoryId
                                    );
                                    field.onChange(newValue);
                                  }}
                                  className="ml-2 text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              selectedCategoryObjects.length === 0
                                ? "Сначала выберите категорию"
                                : isLoadingSubcategories
                                ? "Загрузка подкатегорий..."
                                : filteredSubcategories.length === 0
                                ? "Нет подкатегорий"
                                : field.value.length > 0
                                ? `Выбрано подкатегорий: ${field.value.length}`
                                : "Выберите подкатегории"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 space-y-2 max-h-60 overflow-y-auto">
                            {filteredSubcategories.length > 0 && (
                              <div className="flex gap-2 pb-2 border-b">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const allIds = filteredSubcategories.map(
                                      (sub) => sub.id.toString()
                                    );
                                    field.onChange(allIds);
                                  }}
                                >
                                  Выбрать все
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => field.onChange([])}
                                >
                                  Очистить
                                </Button>
                              </div>
                            )}
                            {filteredSubcategories.map((subcategory) => (
                              <div
                                key={subcategory.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`subcategory-${subcategory.id}`}
                                  checked={field.value.includes(
                                    subcategory.id.toString()
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...field.value,
                                        subcategory.id.toString(),
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (id) =>
                                            id !== subcategory.id.toString()
                                        )
                                      );
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`subcategory-${subcategory.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                >
                                  {subcategory.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as Control<ProductFormValuesInternal>}
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
                <Label>Изображения (макс. 5)</Label>
                <div className="mt-2">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg bg-background/50 border-border ${
                      imageUrls.length >= 5
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-background/80"
                    }`}
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
                        PNG, JPG, WEBP (макс. 5MB каждое)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      multiple
                      onChange={handleImageChange}
                      disabled={imageUrls.length >= 5}
                    />
                  </label>
                </div>
                {form.formState.errors.root?.images && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {(form.formState.errors.root as any).images.message}
                  </p>
                )}
                {imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {imageUrls.map((url, index) => (
                      <div key={url || index} className="relative group">
                        <div className="overflow-hidden rounded-lg aspect-square bg-muted">
                          <Image
                            width={100}
                            height={100}
                            src={
                              url ||
                              "/placeholder.svg?width=100&height=100&query=No+Image"
                            }
                            alt={`Product image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index, url)}
                          className="absolute cursor-pointer top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove image ${index + 1}`}
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
                        control={
                          form.control as Control<ProductFormValuesInternal>
                        }
                        name={`items.${index}.price`}
                        render={({ field: itemField }) => (
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
                                  {...itemField}
                                  value={
                                    itemField.value === undefined
                                      ? ""
                                      : itemField.value
                                  }
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={
                          form.control as Control<ProductFormValuesInternal>
                        }
                        name={`items.${index}.volume`}
                        render={({ field: itemField }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Объем</FormLabel>
                            <FormControl>
                              <Input placeholder="1 л, 500 мл" {...itemField} />
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
                        aria-label={`Remove item ${index + 1}`}
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
                  control={form.control as Control<ProductFormValuesInternal>}
                  name="items"
                  render={() => <FormMessage className="mt-2" />}
                />
              </div>

              <FormField
                control={form.control as Control<ProductFormValuesInternal>}
                name="expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Срок годности (необязательно)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="3 года, 2 месяца"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control as Control<ProductFormValuesInternal>}
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
                  control={form.control as Control<ProductFormValuesInternal>}
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
                {(form.formState.errors.root as any).message ||
                  "Произошла ошибка"}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6 pt-4 border-t bg-background sticky bottom-0">
            <Button
              type="submit"
              disabled={
                isSubmitting || isLoadingCategories || isLoadingSubcategories
              }
            >
              {(isSubmitting ||
                isLoadingCategories ||
                isLoadingSubcategories) && (
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
