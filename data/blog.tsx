import { BlogDetails } from "@/features/blogs/types/blog.types";

export const blogs: BlogDetails[] = [
    {
        id: '1',
        title: "The best products that shape fashion",
        slug: 'the-best-products-that-shape-fashion',
        intro: 'Discover the latest trends and styles in fashion. From runway looks to everyday wear, we bring you the best products that shape the world of fashion.',
        categories: ['collection', 'clothing', 'dresses', 'fashion'],
        tags: ['clothing', 'fashion', 'products', 'store'],
        date: 'feb 21, 2026',
        image: '/blog/blog-1.webp',
        details: '',
        author: 'John Doe',
        authorImage: '/blog/blog-1.webp',
        authorBio: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
        comments: [
            {
                id: '1',
                author: 'John Doe',
                authorImage: '/blog/blog-1.webp',
                comment: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
                date: 'feb 21, 2026',
            },
            {
                id: '2',
                author: 'John Doe',
                authorImage: '/blog/blog-1.webp',
                comment: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
                date: 'feb 21, 2026',
            },
        ]
    },
    {
        id: '2',
        title: "New finds from tuckerneck",
        slug: 'new-finds-from-tuckerneck',
        intro: 'Discover the latest trends and styles in fashion. From runway looks to everyday wear, we bring you the best products that shape the world of fashion.',
        categories: ['collection', 'clothing', 'dresses', 'fashion'],
        tags: ['clothing', 'fashion', 'products', 'store'],
        date: 'April 12, 2026',
        image: '/blog/blog-2.webp',
        details: '',
        author: 'John Doe',
        authorImage: '/blog/blog-1.webp',
        authorBio: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
        comments: [
            {
                id: '1',
                author: 'John Doe',
                authorImage: '/blog/blog-1.webp',
                comment: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
                date: 'feb 21, 2026',
            },
            {
                id: '2',
                author: 'John Doe',
                authorImage: '/blog/blog-1.webp',
                comment: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
                date: 'feb 21, 2026',
            },
        ]
    },
    {
        id: '3',
        title: "sunset sets from saks",
        slug: 'sunset-sets-from-saks',
        intro: 'Discover the latest trends and styles in fashion. From runway looks to everyday wear, we bring you the best products that shape the world of fashion.',
        categories: ['collection', 'clothing', 'dresses', 'fashion'],
        tags: ['clothing', 'fashion', 'products', 'store'],
        date: 'April 12, 2026',
        image: '/blog/blog-3.jpg',
        details: '',
        author: 'John Doe',
        authorImage: '/blog/blog-1.webp',
        authorBio: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
        comments: [
            {
                id: '1',
                author: 'John Doe',
                authorImage: '/blog/blog-1.webp',
                comment: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
                date: 'feb 21, 2026',
            },
            {
                id: '2',
                author: 'John Doe',
                authorImage: '/blog/blog-1.webp',
                comment: 'John Doe is a fashion blogger who has been writing about fashion for over 10 years.',
                date: 'feb 21, 2026',
            },
        ]
    }
]