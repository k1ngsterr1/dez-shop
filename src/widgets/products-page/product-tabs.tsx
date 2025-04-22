"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProductFeaturesTab } from "./products-feature-tab";

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
