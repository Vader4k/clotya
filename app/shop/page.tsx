import { productServices } from "@/features/products/services/product.service";
import { normalizeParams } from "@/features/products/utils/product.utils";
import Banner from "@/sections/shop/Banner";
import ProductGrid from "@/sections/shop/ProductGrid";
import { PageProp } from "@/sections/shop/types/shop.types";
import FiltersPanel from "@/features/products/components/FiltersPanel";
import { categoriesService } from "@/features/categories/services/categories.service";

const page = async ({ searchParams }: PageProp) => {
  const resolvedSearchParams = await searchParams;
  const filters = normalizeParams(resolvedSearchParams);
  const products = await productServices.getAll(filters);

  // TODO: will be replaced with a proper fetch api with a cache
  const categories = await categoriesService.getAllCategories();

  return (
    <main className="w-full max-w-7xl mx-auto my-14 px-3">
      <div className="flex items-start gap-20">
        <div className="w-full flex-1 min-h-screen">
          <FiltersPanel categories={categories} />
        </div>
        <div className="w-full flex-4 grid gap-6">
          <Banner />
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
};

export default page;
