// TODO: will separate server and client functions when backend is ready
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productServices } from "./product.service";
import { Product } from "@/data/products";

export const useProductBySlug = (slug: string): UseQueryResult<Product | undefined> => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => productServices.getBySlug(slug),
        enabled: !!slug,
    });
};