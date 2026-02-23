import { Category } from "@/data/categories";

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
  showRange: boolean
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