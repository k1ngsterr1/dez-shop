"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductFeaturesTab } from "./products-feature-tab";
import { ProductSpecificationsTab } from "./product-specification";

interface ProductTabsProps {
  features: string[];
  specifications: Array<{ name: string; value: string }>;
}

export function ProductTabs({ features, specifications }: ProductTabsProps) {
  return (
    <Tabs defaultValue="features" className="mb-12">
      <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
        <TabsTrigger
          value="features"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
        >
          Особенности
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
        >
          Характеристики
        </TabsTrigger>
      </TabsList>
      <TabsContent value="features" className="pt-6">
        <ProductFeaturesTab features={features} />
      </TabsContent>
      <TabsContent value="specifications" className="pt-6">
        <ProductSpecificationsTab specifications={specifications} />
      </TabsContent>
    </Tabs>
  );
}
