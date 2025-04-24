"use client";

import { CategoryProductsContent } from "@/widgets/category-page/category-page";

interface Props {
  slug: string;
}

export default function CategoryPageClient({ slug }: Props) {
  return <CategoryProductsContent slug={slug} />;
}
