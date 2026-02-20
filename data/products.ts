import { ProductCardProps } from "@/features/products/types/product.types";

export interface Product extends ProductCardProps {
    category: string[];
    tags?: string[];
    sku: string;
    inventory: {
        size: string;
        quantity: number;
    }[];
}

export const allProducts: Product[] = [
    {
        id: '1',
        slug: 'sleeveless-ribbed-short-dress',
        name: 'Sleeveless ribbed short dress',
        category: ['dresses', 'casual', 'women'],
        discountPrice: 14.99,
        discount: 26,
        images: ['/sleev.webp'],
        reviews: 1,
        sold: 64,
        isBestSeller: true,
        price: 19.99,
        sku: 'SKU001',
        inventory: [
            {
                size: 'S',
                quantity: 25,
            },
            {
                size: 'M',
                quantity: 25,
            },
            {
                size: 'L',
                quantity: 25,
            },
            {
                size: 'XL',
                quantity: 25,
            },
        ]
    },
    {
        id: '2',
        slug: 'basic-relax-fit-leggings',
        name: 'Basic relax fit leggings',
        category: ['dresses', 'tops & bodysuits', 'women'],
        discountPrice: 24.90,
        images: ['/leggings.webp'],
        reviews: 1,
        sold: 64,
        discount: 17,
        isBestSeller: true,
        price: 29.90,
        sku: 'SKU002',
        inventory: [
            {
                size: 'S',
                quantity: 25,
            },
            {
                size: 'M',
                quantity: 25,
            },
            {
                size: 'L',
                quantity: 25,
            },
            {
                size: 'XL',
                quantity: 25,
            },
        ]
    }
]