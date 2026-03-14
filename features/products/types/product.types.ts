import { Category } from "@/features/categories/types/categories.types";
import { ProductSchemaType } from "../schema/productSchema";


export type ProductCardProps = {
  _id: string,
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
  shortDescription?: string
  isShopPage?: boolean
}

export type ProductFilters = {
  category?: string
  colors?: string
  sizes?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
  sort?: string
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
  refetch: () => void;
}

export type AdminProductFilters = {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AdminProduct extends Omit<ProductSchemaType, "category"> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  sold: number;
  reviews: {
    average: number;
    count: number;
  };
  category: {
    _id: string;
    name: string;
  }[]
}

export type AdminProductResponse = {
  products: AdminProduct[];
  pagination: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    limit: number
  };
}

export type PublicProductResponse = {
  products: Product[];
  pagination: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

export interface AdminProductTableProps {
  products: AdminProductResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
}

export interface AdminProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface AdminProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export interface AdminProductLimitSelectProps {
    limit: number;
    onLimitChange: (limit: string) => void;
}


export interface ImageUploaderProps {
  value?: (string | File)[];
  onChange?: (urls: (string | File)[]) => void;
}


export type Color = {
    name: string;
    hex: string;
}

export interface Product extends ProductCardProps {
    category: {
        name: string;
        slug: string;
    }[];
    tags?: {
        _id: string;
        name: string;
    }[];
    sku: string;
    inventory: {
        size: string;
        quantity: number;
    }[];
    colors?: Color[];
    shortDescription: string
}
