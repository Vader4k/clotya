import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categories.service";
import { QUERIES } from "@/queries/queries";

export const useCategories = () => {
    return useQuery({
        queryKey: [QUERIES.admin.categories.GETNADD],
        queryFn: () => categoriesService.getAllCategories(),
        staleTime: 60 * 60 * 1000,
    });
};
