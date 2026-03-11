import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";
import { CategorySchemaType } from "../schema/categorySchema";
import { Category } from "../types/categories.types";

export const categoriesService = {
    // Fetch all categories
    getAllCategories: async (): Promise<Category[]> => {
        const response = await axiosInstance.get(QUERIES.admin.categories.GETNADD)
        return response.data.categories
    },
    addNewCategory: async (data: CategorySchemaType) => {
        const response = await axiosInstance.post(QUERIES.admin.categories.GETNADD, data)
        return response.data
    },
    getAllCategoriesPublic: async (): Promise<Category[]> => {
        const response = await axiosInstance.get(QUERIES.public.categories.GET)
        return response.data.categories
    },
    editCategory: async ({ data, id }: { data: CategorySchemaType, id: string }) => {
        const res = await axiosInstance.put(QUERIES.admin.categories.EDITNDEL, data, {
            params: {
                id
            }
        })
        return res.data
    },
    deleteCategory: async (id: string) => {
        const res = await axiosInstance.delete(QUERIES.admin.categories.EDITNDEL, {
            params: {
                id
            }
        })
        return res.data
    }
}