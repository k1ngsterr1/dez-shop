"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductFeaturesTab } from "./products-feature-tab";
import { ProductSpecificationsTab } from "./product-specification";

interface ProductTabsProps {
  description: string;
}

export function ProductTabs({ description }: ProductTabsProps) {
  return (
    <Tabs defaultValue="features" className="mb-12">
      <TabsContent value="features" className="pt-6">
        <ProductFeaturesTab description={description} />
      </TabsContent>
    </Tabs>
  );
}
