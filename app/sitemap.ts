import { MetadataRoute } from 'next';
import { blogs } from '@/data/blog';
import { QUERIES } from '@/queries/queries';

const BASE_URL = 'https://clotya-chi.vercel.app';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clotya-api.vercel.app'; // Fallback if not defined

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/shop',
    '/product',
    '/blog',
    '/compare',
    '/contact',
    '/order-tracking',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Product Routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${API_URL}${QUERIES.public.products.GET_ALL}`, {
        next: { revalidate: 86400 } // Revalidate daily
    });
    if (response.ok) {
        const products = await response.json();
        productRoutes = products.map((product: any) => ({
            url: `${BASE_URL}/product/${product.slug}`,
            lastModified: new Date(product.updatedAt || new Date()),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // 3. Dynamic Blog Routes
  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(), // Local data doesn't have updatedAt, using current date
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
