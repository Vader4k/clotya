import { useQuery } from "@tanstack/react-query";
import { recentProducts } from "../services/recent-products.service";

export const useGetRecentProducts = (ids: string[]) => {
    return useQuery({
        queryKey: ["recent-products", ids],
        queryFn: () => recentProducts.getAll(ids),
        enabled: !!ids.length,
    })
}