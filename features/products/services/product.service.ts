import { allProducts, type Product } from "@/data/products";
import { AdminProductFilters, ProductFilters, AdminProductResponse } from "../types/product.types";
import { QUERIES } from "@/queries/queries";
import axiosInstance from "@/lib/http/axios";
import { processUrlVariables } from "@/lib/utils";
import { ProductSchemaType } from "../schema/productSchema";
import { ToFormData } from "../utils/product.utils";


export const adminProductServices = {
    getAll: async (filter?: AdminProductFilters): Promise<AdminProductResponse> => {
        const response = await axiosInstance.get(QUERIES.admin.products.GETNADD, {
            params: {
                ...filter
            }
        });
        return response.data;
    },

    add: async (product: ProductSchemaType): Promise<ProductSchemaType> => {
        const formData = ToFormData(product);
        const response = await axiosInstance.post(QUERIES.admin.products.GETNADD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    edit: async (id: string, product: ProductSchemaType): Promise<ProductSchemaType> => {
        const formData = ToFormData(product);
        const response = await axiosInstance.put(
            processUrlVariables(QUERIES.admin.products.EDITNDEL, { id }),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        return response.data.product;
    },

    // delete: async (id: number): Promise<void> => {
    //     await axiosInstance.delete(QUERIES.admin.products.EDITNDEL.replace(':id', id.toString()));
    // },
}

export const productServices = {
    // get all products
    getAll: async (filters: ProductFilters): Promise<Product[]> => {
        return Promise.resolve(allProducts);
    },

    // get product by slug
    getBySlug: async (slug: string): Promise<Product | undefined> => {
        const url = processUrlVariables(QUERIES.public.products.GET_BY_SLUG, { slug });
        const response = await axiosInstance.get(url);
        return response.data.product;
    },

    getByCategory: async (category: string): Promise<Product[]> => {
        const url = processUrlVariables(QUERIES.public.products.GET_BY_CATEGORY, { category });
        const response = await axiosInstance.get(url);
        return response.data.products;
    },

    // get products by search
    getBySearch: async (search: string): Promise<Product[]> => {
        const url = processUrlVariables(QUERIES.public.products.GET_BY_SEARCH, { search });
        const response = await axiosInstance.get(url);
        return response.data.products;
    },

    //get best seller products
    getBestSeller: async (): Promise<Product[]> => {
        const response = await axiosInstance.get(QUERIES.public.products.GET_BEST_SELLER);
        return response.data.products;
    },

    // get related products
    getRelated: async (id: string): Promise<Product[]> => {
        const url = processUrlVariables(QUERIES.public.products.GET_RELATED, { id });
        const response = await axiosInstance.get(url);
        return response.data.products;
    },
};
