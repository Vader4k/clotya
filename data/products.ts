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
        category: ['women'],
        tags: ['casual', 'short', 'dresses'],
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
        category: ['women'],
        tags: ['dresses', 'tops & bodysuits'],
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
    },
    {
        id: '3',
        slug: 'check-overshirt-with-pocket-detail',
        name: 'Check overshirt with pocket detail',
        category: ['men'],
        tags: ['shirts', 'men', 'overshirt', 'Tshirt'],
        discountPrice: 112.00,
        discount: 14,
        images: ['/overshirt1.webp', '/overshirt2.webp'],
        reviews: 1,
        isBestSeller: false,
        price: 129.90,
        sku: 'SKU003',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '4',
        slug: 'world-wide-cup-print-t-shirt',
        name: 'World wide cup print t-shirt',
        category: ['men'],
        tags: ['shirts', 'men', 'Tshirt', 'longsleeves'],
        discountPrice: 23.99,
        discount: 17,
        images: ['/cup1.webp', '/cup2.webp'],
        reviews: 1,
        isBestSeller: false,
        price: 29.99,
        sku: 'SKU004',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '5',
        slug: 'slogan-hoodie-with-label-detail',
        name: 'Slogan hoodie with label detail',
        category: ['men', 'women'],
        tags: ['men', 'Tshirt', 'hoodie', 'longsleeves'],
        discountPrice: 11.99,
        discount: 37,
        images: ['/slogan1.webp', '/slogan2.webp'],
        reviews: 1,
        isBestSeller: false,
        price: 18.99,
        sku: 'SKU005',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '6',
        slug: 'pouch-pocket-hoodie-orange',
        name: 'Pouch pocket hoodie orange',
        category: ['men', 'women'],
        tags: ['men', 'Tshirt', 'hoodie', 'longsleeves'],
        discountPrice: 29.50,
        discount: 22,
        images: ['/pocketmen1.webp', '/pocketmen2.webp'],
        reviews: 1,
        isBestSeller: false,
        price: 34.99,
        sku: 'SKU006',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '7',
        slug: 'ripstop-cargo-trouser-with-pockets',
        name: 'Ripstop cargo trouser with pockets',
        category: ['men'],
        tags: ['men', 'trousers', 'cargo'],
        discountPrice: 49.99,
        discount: 29,
        images: ['/pocket1.jpeg', '/pocket2.jpeg'],
        reviews: 1,
        isBestSeller: false,
        price: 69.99,
        sku: 'SKU007',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '8',
        slug: 'relaxed-fit-plaid-flannel-shirt',
        name: 'Relaxed fit plaid flannel shirt',
        category: ['men'],
        tags: ['men', 'shirts', 'flannel', 'plaid'],
        images: ['/shirt1.webp', '/shirt2.webp'],
        reviews: 1,
        isBestSeller: false,
        price: 39.99,
        sku: 'SKU008',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '9',
        slug: 'quilted-bomber-jacket-with-ribbed-trims',
        name: 'Quilted bomber jacket with ribbed trims',
        category: ['men'],
        tags: ['men', 'jacket', 'bomber', 'ribbed'],
        images: ['/bomber1.jpg', '/bomber2.jpg'],
        reviews: 1,
        discountPrice: 47.58,
        discount: 32,
        isBestSeller: false,
        price: 69.48,
        sku: 'SKU009',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    },
    {
        id: '10',
        slug: 'pouch-pocket-hoodie',
        name: 'Pouch pocket hoodie',
        category: ['men', 'women'],
        tags: [ 'hoodie', 'pouch', 'ribbed'],
        images: ['/pocket1.jpeg', '/pocket2.jpeg'],
        reviews: 1,
        discountPrice: 27.40,
        discount: 16,
        isBestSeller: false,
        price: 32.40,
        sku: 'SKU010',
        inventory: [
            {
                size: 'S',
                quantity: 5,
            },
            {
                size: 'M',
                quantity: 5,
            },
            {
                size: 'L',
                quantity: 10,
            },
            {
                size: 'XL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
            {
                size: 'XXL',
                quantity: 25,
            },
        ]
    }
]