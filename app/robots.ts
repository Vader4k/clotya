import { MetadataRoute } from 'next';

const BASE_URL = 'https://clotya-chi.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/dashboard',
          '/login',
          '/register',
          '/api', // Internal API routes
          "/cart"
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
