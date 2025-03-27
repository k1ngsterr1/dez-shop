import { ProductSlider } from "@/features/product-slider/product-slider";
import { ArticlesList } from "@/widgets/home-page/articles-list";
import { Categories } from "@/widgets/home-page/categories";
import { HeroSection } from "@/widgets/home-page/hero-section";
import { Partners } from "@/widgets/home-page/partners-block";
import { ProductsBlock } from "@/widgets/home-page/products-block";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 pt-6">
      <HeroSection />
      <Partners />
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Categories />
        </div>
        <div className="lg:col-span-3">
          <ProductSlider />
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-primary">Статьи</h2>
            <ArticlesList />
          </div>
        </div>
      </div>
      <ProductsBlock />
    </div>
  );
}
