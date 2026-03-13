// TODO: will separate server and client functions when backend is ready
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productServices, adminProductServices } from "./product.service";
import { Product } from "@/data/products";
import { AdminProductFilters, AdminProductResponse } from "../types/product.types";
import { QUERIES } from "@/queries/queries";

export const useProductBySlug = (slug: string): UseQueryResult<Product | undefined> => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => productServices.getBySlug(slug),
        enabled: !!slug,
    });
};

export const useGetAdminProducts = (filter?: AdminProductFilters): UseQueryResult<AdminProductResponse> => {
    return useQuery({
        queryKey: [QUERIES.admin.products.GETNADD, filter],
        queryFn: () => adminProductServices.getAll(filter),
    });
};