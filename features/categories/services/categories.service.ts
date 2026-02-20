import { allCategories, type Category } from "@/data/categories";

export const categoriesService = {
    // Fetch all categories
    //TODO: replace with actual api call when available
    getAllCategories: async (): Promise<Category[]> => {
        return Promise.resolve(allCategories);
    }
}