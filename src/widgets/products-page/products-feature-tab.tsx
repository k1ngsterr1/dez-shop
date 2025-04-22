import { Shield } from "lucide-react";

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
        <p
          className="whitespace-normal break-words overflow-wrap-anywhere max-w-full"
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            hyphens: "auto",
          }}
        >
          {description}
        </p>
        <div className="space-y-4"></div>
      </div>
    </div>
  );
}
