
export type Category = {
    id: string;
    name: string;
    slug: string;
    desc: string;
    totalProducts: number;
    tags: string[];
}

export const allCategories: Category[] = [
    {
        id: '1',
        name: "women",
        slug: 'women',
        desc: "Step into the world of Clotya's women's collection, where timeless elegance meets modern sophistication.",
        totalProducts: 54,
        tags: [
            "blazers",
            'blouses & shirts',
            'dresses',
            'jackets & coats',
            'jeans',
            'knit',
            'pants'
        ]
    },
    {
        id: '2',
        name: "men",
        slug: 'men',
        desc: "Explore our premium selection of men's clothing, featuring classic staples and modern essentials.",
        totalProducts: 23,
        tags: [
            "pants",
            'shirts',
            'shorts',
            'sweatshirts & hoodies',
        ]
    },
    {
        id: '3',
        slug: 'shoes',
        name: 'shoes',
        desc: ".",
        totalProducts: 1,
        tags: ['']
    },
    {
        id: '4',
        slug: 'accessories',
        name: 'accessories',
        desc: "",
        totalProducts: 1,
        tags: ['']
    }
]