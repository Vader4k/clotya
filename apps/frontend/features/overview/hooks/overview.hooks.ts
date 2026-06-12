import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { overviewServices } from "../services/overview.services"
import { QUERIES } from "@/queries/queries"
import { QuickStatApiResponse, RevenueOverviewResponse } from "../types"

export const useQuickStats = (): UseQueryResult<QuickStatApiResponse> => {
    return useQuery({
        queryKey: [QUERIES.admin.overview.QUICK_STATS],
        queryFn: () => overviewServices.quickStats(),
    })
}

export const useRevenueOverview = ({ range = "30d" }: { range: "7d" | "30d" | "12m" }): UseQueryResult<RevenueOverviewResponse> => {
    return useQuery({
        queryKey: [QUERIES.admin.overview.GET, range],
        queryFn: () => overviewServices.revenueOverview({ range }),
    })
}