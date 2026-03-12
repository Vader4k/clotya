import { Category } from "@/features/categories/types/categories.types";
import { ProductSchemaType } from "../schema/productSchema";


export type ProductCardProps = {
  id: string,
  name: string,
  price: number,
  images: string[],
  reviews: number,
  discountPrice?: number,
  discount?: number,
  isBestSeller: boolean,
  inventory?: {
    size: string;
    quantity: number;
  }[],
  sold?: number,
  slug: string
  showRange?: boolean
  description?: string
}

export type ProductFilters = {
  category?: string
  color?: string
  size?: string
  price?: number
  page?: number
  limit?: number
}

export interface FilterProps {
  categories: Category[]
  selectedCategories: string;
  setSelectedCategories: (categories: string) => void
}

export interface PriceFilterProps {
  price?: number[]
  setPrice?: (price: number[]) => void
  onFilter?: (price: number[]) => void
}

export type ProductActionsProps = {
  slug: string
  id: string
  name: string
  image: string
  rating: number
  price: number
  discountPrice?: number
}

export type ProductFormSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ProductSchemaType) => Promise<void>;
    initialData?: Partial<ProductSchemaType>;
    title: string;
    description: string;
}