"use client";

import { Truck, ShieldCheck, Clock, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactFormStore } from "@/entities/contact-form/store/use-contact-form";

interface ProductActionsProps {
  expiry: string;
  isInStock: boolean;
}

export function ProductActions({ expiry }: ProductActionsProps) {
  const { openContactForm } = useContactFormStore();

  return (
    <div className="space-y-6 mt-4">
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
      <div className="space-y-2 pt-4 border-t">
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={openContactForm}
        >
          <Phone className="mr-2 h-5 w-5" />
          Связаться для консультации
        </Button>
      </div>
    </div>
  );
}
