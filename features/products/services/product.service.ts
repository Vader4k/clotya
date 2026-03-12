import { allProducts, type Product } from "@/data/products";
import { ProductFilters } from "../types/product.types";
import { QUERIES } from "@/queries/queries";
import axiosInstance from "@/lib/http/axios";
import { processUrlVariables } from "@/lib/utils";

export const productServices = {
    // get all products
    getAll: async (filters: ProductFilters): Promise<Product[]> => {
        return Promise.resolve(allProducts);
    },

    // get product by slug
    getBySlug: async (slug: string): Promise<Product | undefined> => {
        return Promise.resolve(allProducts.find((product) => product.slug === slug));
    },

    getByCategory: async (category: string): Promise<Product[]> => {
        const url = processUrlVariables(QUERIES.public.products.GET_BY_CATEGORY, { category });
        const response = await axiosInstance.get(url);
        return response.data.products;
    },

    // get products by search
    getBySearch: async (search: string): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    },

    // get products by price
    getByPrice: async (price: number): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) => product.price === price),
        );
    },

    //get best seller products
    getBestSeller: async (): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) => product.isBestSeller),
        );
    },

    // get related products
    getRelated: async (slug: string, category: string[]): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) => product.slug !== slug && product.category.some((cat) => category.includes(cat))),
        );
    },
};
