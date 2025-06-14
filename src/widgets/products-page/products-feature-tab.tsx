import React from "react";
import { Shield } from "lucide-react";
import { formatDescriptionToHTML } from "@/lib/formatDescriptionToHTML";

interface ProductFeaturesTabProps {
  description: string;
}

export function ProductFeaturesTab({ description }: ProductFeaturesTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-muted/20 p-6 rounded-lg border border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Подробное описание
        </h3>
        <div
          className="prose prose-neutral max-w-full whitespace-normal break-words overflow-wrap-anywhere space-y-6"
          dangerouslySetInnerHTML={{
            __html: formatDescriptionToHTML(description),
          }}
        />
        <div className="space-y-4"></div>
      </div>
    </div>
  );
}
