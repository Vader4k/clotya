import { blogs } from "@/data/blog";
import { BlogDetails } from "../types/blog.types";

export const blogService = {
    //get all blog post
    getAll: async (): Promise<BlogDetails[]> => {
        return Promise.resolve(blogs);
    },

    //get blog by slug
    getBySlug: async (slug: string): Promise<BlogDetails | null> => {
        const blog = blogs.find((blog) => blog.slug === slug);
        return Promise.resolve(blog || null);
    },

    //get related blogs
    getRelatedBlogs: async (slug: string): Promise<BlogDetails[]> => {
        const currentBlog = blogs.find((blog) => blog.slug === slug);
        if (!currentBlog) return Promise.resolve([]);

        const relatedBlogs = blogs.filter((blog) =>
            blog.slug !== slug &&
            blog.categories.some((cat) => currentBlog.categories.includes(cat))
        );
        return Promise.resolve(relatedBlogs);
    },
}