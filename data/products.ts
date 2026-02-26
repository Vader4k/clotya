import { ProductCardProps } from "@/features/products/types/product.types";

export type Color = {
    name: string;
    hex: string;
}

export interface Product extends ProductCardProps {
    category: string[];
    tags?: string[];
    sku: string;
    inventory: {
        size: string;
        quantity: number;
    }[];
    colors?: Color[];
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
                size: 'XS',
                quantity: 25,
            },
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
            {
                size: 'XXL',
                quantity: 25,
            },
        ],
        description: 'A chic and comfortable sleeveless ribbed short dress, perfect for casual outings and warm summer days. Effortlessly stylish.',
        colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
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
        ],
        colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },

        ],
        description: 'Experience ultimate comfort with these basic relax-fit leggings. Ideal for lounging or light workouts, they offer a flattering fit.'
    },
    {
        id: '3',
        slug: 'check-overshirt-with-pocket-detail',
        name: 'Check overshirt with pocket detail',
        category: ['men'],
        tags: ['shirts', 'men', 'overshirt', 'Tshirt'],
        discountPrice: 112.00,
        discount: 14,
        images: ['/overshirt1.webp', '/overshirt2.jpg'],
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'This check overshirt features unique pocket details, combining a rugged aesthetic with modern functionality for a versatile layering piece.'
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'Express your style with this world wide cup print t-shirt. Crafted from soft cotton for all-day comfort and breathability.'
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'Stay cozy and trendy in this slogan hoodie, featuring subtle label details and a relaxed fit for a modern look.'
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'Brighten your wardrobe with this vibrant orange pouch pocket hoodie. A bold choice that combines comfort with a striking color.'
    },
    {
        id: '7',
        slug: 'ripstop-cargo-trouser-with-pockets',
        name: 'Ripstop cargo trouser with pockets',
        category: ['men'],
        tags: ['men', 'trousers', 'cargo'],
        discountPrice: 49.99,
        discount: 29,
        images: ['/trousers1.jpeg', '/trousers2.jpeg'],
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'Durable and practical, these ripstop cargo trousers feature multiple pockets and a rugged design for all your outdoor adventures.'
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'A classic relaxed fit plaid flannel shirt that never goes out of style. Perfect for layering over your favorite t-shirt.'
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'This quilted bomber jacket with ribbed trims provides both warmth and a sleek, contemporary silhouette for any urban explorer.'
    },
    {
        id: '10',
        slug: 'pouch-pocket-hoodie',
        name: 'Pouch pocket hoodie',
        category: ['men', 'women'],
        tags: ['hoodie', 'pouch', 'ribbed'],
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
        ],
                colors: [
            {
                name: 'black',
                hex: '#000000',
            },
            {
                name: 'white',
                hex: '#FFFFFF',
            },
            {
                name: 'red',
                hex: '#FF0000',
            },
            {
                name: 'green',
                hex: '#00FF00',
            },
            {
                name: 'blue',
                hex: '#0000FF',
            },
            
        ],
        description: 'A versatile pouch pocket hoodie that offers a perfect blend of style and comfort, making it an essential everyday staple.'
    }
]