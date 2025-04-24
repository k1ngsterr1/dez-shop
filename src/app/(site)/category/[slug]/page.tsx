import type { Metadata } from "next";
import CategoryPageClient from "@/widgets/category-page/category-page-client";

type Props = {
  params: any;
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Категория: ${slug}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryPageClient slug={slug} />;
}
