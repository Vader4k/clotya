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
