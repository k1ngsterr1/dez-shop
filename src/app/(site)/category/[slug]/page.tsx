import { CategoryProductsContent } from "@/widgets/category-page/category-page";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryProductsContent slug={params.slug} />;
}
