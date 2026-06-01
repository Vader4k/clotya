import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productServices } from "@/features/products/services/product.service";
import { ProductCardProps } from "@/features/products/types/product.types";
import { getCachedSearchResults, cacheSearchResults } from "../utils/indexedDb";

export const useSearchResults = (searchQuery: string): UseQueryResult<ProductCardProps[]> => {
    const query = useQuery({
        queryKey: ["products", "search", searchQuery],
        queryFn: async () => {
            const cachedData = await getCachedSearchResults(searchQuery);
            if (cachedData) {
                return cachedData;
            }

            const data = await productServices.getBySearch(searchQuery);

            if (data && data.length > 0) {
                await cacheSearchResults(searchQuery, data);
            }

            return data;
        },
        enabled: !!searchQuery,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};
