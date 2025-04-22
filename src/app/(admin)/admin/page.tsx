import { ProductSlider } from "@/features/product-slider/product-slider";
import { DisinfectantCalculator } from "@/widgets/home-page/calculator";
import { Categories } from "@/widgets/home-page/categories";
import { HeroSection } from "@/widgets/home-page/hero-section";
import { ProductsBlock } from "@/widgets/home-page/products-block";

export default function Test() {
  return (
    <div className="container w-full mx-auto py-8 pt-6">
      <HeroSection />
      <DisinfectantCalculator />
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Categories />
        </div>
        <div className="lg:col-span-3">
          <ProductSlider />
        </div>
      </div>
      <ProductsBlock />
    </div>
  );
}
