import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";

export const overviewServices = {
    quickStats: async () => {
        const response = await axiosInstance.get(QUERIES.admin.overview.QUICK_STATS)
        return response.data
    },
    revenueOverview: async ({ range = "30d" }: { range: "7d" | "30d" | "12m" }) => {
        const response = await axiosInstance.get(QUERIES.admin.overview.GET, { params: { range } })
        return response.data
    }
}