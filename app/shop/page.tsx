import { productServices } from "@/features/products/services/product.service";
import { normalizeParams } from "@/features/products/utils/product.utils";
import Banner from "@/sections/shop/Banner";
import ProductGrid from "@/sections/shop/ProductGrid";
import { PageProp } from "@/sections/shop/types/shop.types";
import FiltersPanel from "@/features/products/components/FiltersPanel";

const page = async ({ searchParams }: PageProp) => {
  const filters = normalizeParams(searchParams);
  const products = await productServices.getAll(filters);

  return (
    <main className="w-full max-w-7xl mx-auto my-12 px-3">
      <div className="flex items-start">
        <div className="w-full flex-1 min-h-screen">
          <FiltersPanel />
        </div>
        <div className="w-full flex-[2.8] grid gap-6">
          <Banner />
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
};

export default page;
