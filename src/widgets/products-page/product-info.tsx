// ProductInfo.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Product, Item } from "@/entities/product/dto/product.dto";
import { formatPrice } from "@/lib/format-price";
import { Check } from "lucide-react";
import { formatDescriptionToHTML } from "@/lib/formatDescriptionToHTML";
import type { Dispatch, SetStateAction } from "react";

interface ProductInfoProps {
  product: Product;
  handleChangeId: (id: number) => void;
  activeImage: number;
  setActiveImage: Dispatch<SetStateAction<number>>;
}

const parseProductItems = (itemsJson: string): Item[] => {
  try {
    if (!itemsJson || itemsJson === "null") return [];
    const items = JSON.parse(itemsJson);
    return Array.isArray(items) ? items : [];
  } catch (e) {
    console.error("Failed to parse product items:", e, "Raw:", itemsJson);
    return [];
  }
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  handleChangeId,
  activeImage,
  setActiveImage,
}) => {
  const items = useMemo(
    () => parseProductItems(product.items),
    [product.items]
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // 1) Whenever items OR activeImage change, clamp idx, update state & notify parent
  useEffect(() => {
    if (items.length > 0) {
      const idx = Math.min(Math.max(activeImage, 0), items.length - 1);

      if (idx !== activeImage) {
        setActiveImage(idx);
      }

      setSelectedItem(items[idx]);
      handleChangeId(idx);
    } else {
      setSelectedItem(null);
    }
  }, [items, activeImage, handleChangeId, setActiveImage]);

  const handleItemChange = (id: string) => {
    const idx = Number(id);
    setSelectedItem(items[idx]);
    setActiveImage(idx);
    handleChangeId(idx);
  };

  const displayItem = items.length === 1 ? items[0] : selectedItem;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span>{product.categories?.[0]?.name ?? "Без категории"}</span>
          {product.subcategories?.[0]?.name && (
            <>
              <span className="mx-1">/</span>
              <span>{product.subcategories[0].name}</span>
            </>
          )}
        </div>
        {product.isInStock ? (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <Check className="h-3 w-3 mr-1" /> В наличии
          </Badge>
        ) : (
          <Badge variant="destructive">Нет в наличии</Badge>
        )}
      </div>

      {items.length > 1 && (
        <div className="space-y-2">
          <Label htmlFor="item-select" className="text-sm font-medium">
            Выберите объем:
          </Label>
          <Select
            value={String(items.indexOf(selectedItem!))}
            onValueChange={handleItemChange}
          >
            <SelectTrigger id="item-select" className="w-full md:w-[200px]">
              <SelectValue placeholder="Выберите объем" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item, i) => (
                <SelectItem key={i} value={String(i)}>
                  {item.volume}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {displayItem ? (
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(displayItem.price)}
          </span>
          <span className="text-xl text-muted-foreground">
            / {displayItem.volume}
          </span>
        </div>
      ) : (
        <div className="text-xl font-semibold text-muted-foreground">
          Цена по запросу
        </div>
      )}

      <div
        className="text-muted-foreground pt-4 border-t prose prose-neutral max-w-full break-words"
        style={{ whiteSpace: "pre-line" }}
        dangerouslySetInnerHTML={{
          __html: formatDescriptionToHTML(product.description)
            .replace(/(\d+\.\d+\.[^<]+:)/g, "<br/><br/><b>$1</b>")
            .replace(/(Рекомендации:)/g, "<br/><br/><b>$1</b>")
            .replace(/(Токсичность:)/g, "<br/><br/><b>$1</b>")
            .replace(/(Безопасность:)/g, "<br/><br/><b>$1</b>")
            .replace(
              /<strong>Области применения:<\/strong><br>/g,
              "<strong>Области применения:</strong><br><br>"
            ),
        }}
      />
    </div>
  );
};

export default ProductInfo;
