import { categoriesService } from "@/features/categories/services/categories.service";
import { Category } from "@/data/categories";
import Link from "next/link";

/**
 Handles the internal layout and visual hierarchy of each category
 */
const CategoryCard = ({ category, className = "" }: { category: Category; className?: string }) => {
  if (!category) return null;

  return (
    <Link href={`/shop?category=${category.slug}`} className={`w-full h-full p-10 flex flex-col items-start gap-1 ${className}`}>
      {/* 1. Meta Information (Low weight) */}
      <span className="text-xs text-black">{category.totalProducts} products</span>

      {/* 2. Primary Title (High weight) */}
      <h3 className="font-jost text-3xl capitalize">{category.name}</h3>

      {/* 3. Description (Medium weight) */}
      <p className="text-sm max-w-[400px] text-gray-500 line-clamp-2">{category.desc}</p>

      {/* 4. Tags (Contextual details) */}
      {category.tags && category.tags.length > 0 && (
        <div className="flex flex-col items-start gap-2 mt-8">
          {category.tags.map((tag, index) => (
            <span key={index} className="text-sm font-jost capitalize hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

const CategoryGrid = async () => {
  const categories = await categoriesService.getAllCategories();

  // Helper to find category by slug (more resilient than index)
  const getCat = (slug: string) => categories.find((c) => c.slug === slug);

  const women = getCat("women");
  const men = getCat("men");
  const shoes = getCat("shoes");
  const access = getCat("accessories");

  return (
    <section className="h-300 lg:h-160 w-full flex flex-col lg:flex-row items-start gap-4 2xl:gap-8">
      {/* PRIMARY FEATURE (Greatest Visual Weight) */}
      <div className="w-full lg:w-1/2 h-full">
        <CategoryCard category={women!} className="womenCat" />
      </div>

      {/* SECONDARY & TERTIARY AREA */}
      <div className="w-full lg:w-1/2 h-full flex flex-col gap-4 2xl:gap-8">
        {/* Secondary Focus */}
        <div className="h-1/2">
          <CategoryCard category={men!} className="menCat" />
        </div>

        {/* Supporting Categories */}
        <div className="h-1/2 flex flex-col md:flex-row items-start gap-4 2xl:gap-8">
          <div className="w-full md:w-1/2 h-full">
            <CategoryCard category={shoes!} className="shoeCat" />
          </div>
          <div className="w-full md:w-1/2 h-full">
            <CategoryCard category={access!} className="accessCat" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
