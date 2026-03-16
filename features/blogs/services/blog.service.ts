import { blogCategories, blogTags } from "@/data/blog";
import { BlogCardProps, BlogDetails, BlogResponse } from "../types/blog.types";
import { BlogSchemaType } from "../schema/blog.schema";
import { QUERIES } from "@/queries/queries";
import axiosInstance from "@/lib/http/axios";
import { processUrlVariables } from "@/lib/utils";

export const blogService = {
    // PUBLIC ENDPOINTS
    
    //get all blog post
    getAll: async (filters?: {categories?: string, tags?: string, search?: string, page?: number, limit?: number}): Promise<BlogResponse> => {
        const result = await axiosInstance.get(QUERIES.public.blogs.GET_ALL, {
            params: {
                ...filters
            }
        });
        return result.data;
    },

    //get blog by slug
    getBySlug: async (slug: string): Promise<BlogDetails | null> => {
        const url = processUrlVariables(QUERIES.public.blogs.GET_BY_SLUG, { slug });
        const result = await axiosInstance.get(url);
        return result.data.blog;
    },

    //get popular posts
    getPopularPosts: async (): Promise<BlogDetails[]> => {
        const result = await axiosInstance.get(QUERIES.public.blogs.GET_POPULAR);
        return result.data.blogs;
    },

    //get blog categories
    getCategories: async (): Promise<string[]> => {
        return Promise.resolve(blogCategories);
    },

    //get blog tags
    getTags: async (): Promise<string[]> => {
        return Promise.resolve(blogTags);
    },

    // ADMIN ENDPOINTS

    getById: async (id: string): Promise<BlogDetails | null> => {
        const url = processUrlVariables(QUERIES.admin.blogs.GET_N_EDIT_N_DEL, { id });
        const result = await axiosInstance.get(url);
        return result.data.blog;
    },

    create: async (blog: BlogSchemaType): Promise<{ message: string, success: boolean }> => {
        const result = await axiosInstance.post(QUERIES.admin.blogs.GETALL_N_ADD, blog);
        return result.data;
    },

    update: async (id: string, blog: BlogSchemaType): Promise<{ message: string, success: boolean }> => {
        const url = processUrlVariables(QUERIES.admin.blogs.GET_N_EDIT_N_DEL, { id });
        const result = await axiosInstance.put(url, blog);
        return result.data;
    },

    delete: async (id: string): Promise<{ message: string, success: boolean }> => {
        const url = processUrlVariables(QUERIES.admin.blogs.GET_N_EDIT_N_DEL, { id });
        const result = await axiosInstance.delete(url);
        return result.data;
    },
}