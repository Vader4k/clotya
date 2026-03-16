export type CartItem = {
   color?: string,
   product: {
    discountPrice: number,
    images: string[],
    name: string,
    price: number,
    slug: string,
    _id: string
   },
   quantity: number,
   size: string,
   sku: string,
   _id: string
}

export type AddToCartPayload = {
    product: string;
    sku: string;
    quantity: number;
    size: string | null;
    color: string | null;
}
