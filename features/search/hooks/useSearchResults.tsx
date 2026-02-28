import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productServices } from "@/features/products/services/product.service";
import { ProductCardProps } from "@/features/products/types/product.types";

export const useSearchResults = (searchQuery: string): UseQueryResult<ProductCardProps[]> => {
    const query = useQuery({
        queryKey: ["products", "search", searchQuery],
        queryFn: () => productServices.getBySearch(searchQuery),
        enabled: !!searchQuery,
    });
    return query;
};
