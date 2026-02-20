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
}