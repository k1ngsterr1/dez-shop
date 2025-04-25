import { ProductSlider } from "@/features/product-slider/product-slider";
import { Categories } from "@/widgets/home-page/categories";
import { ProductsBlock } from "@/widgets/home-page/products-block";

export default function Catalogue() {
  return (
    <div className="container w-full mx-auto py-8 pt-6">
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
