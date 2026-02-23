import { productServices } from "@/features/products/services/product.service";
import { normalizeParams } from "@/features/products/utils/product.utils";
import Banner from "@/sections/shop/Banner";
import ProductView from "@/sections/shop/ProductView";
import { PageProp } from "@/sections/shop/types/shop.types";
import FiltersPanel from "@/features/products/components/FiltersPanel";
import { categoriesService } from "@/features/categories/services/categories.service";
import Pagination from "@/features/products/components/Pagination";

const page = async ({ searchParams }: PageProp) => {
  const resolvedSearchParams = await searchParams;
  const filters = normalizeParams(resolvedSearchParams);
  const products = await productServices.getAll(filters);

  // TODO: will be replaced with a proper fetch api with a cache
  const categories = await categoriesService.getAllCategories();

  const totalPages = Math.ceil(products.length / 12);
  const currentPage = Number(resolvedSearchParams.page) || 1;

  return (
    <main className="w-full max-w-7xl mx-auto my-6 xl:my-14 px-3 sm:px-5 xl:px-3">
      <div className="flex items-start gap-20">
        <div className="w-full flex-1 min-h-screen hidden xl:block">
          <FiltersPanel categories={categories} />
        </div>
        <div className="w-full flex-4 grid gap-6">
          <Banner />
          <ProductView products={products} />
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </main>
  );
};

export default page;
