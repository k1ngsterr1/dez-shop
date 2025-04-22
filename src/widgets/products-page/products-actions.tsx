"use client";

import { Truck, ShieldCheck, Clock, FileText } from "lucide-react";

interface ProductActionsProps {
  expiry: string;
}

export function ProductActions({ expiry }: ProductActionsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span>Доставка от 1 до 3 дней</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span>Гарантия качества</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Срок годности: {expiry}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Сертификаты качества</span>
        </div>
      </div>
    </div>
  );
}
