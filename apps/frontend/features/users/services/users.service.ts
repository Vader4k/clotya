import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";

export const usersServices = {
    getAllUsers: async ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => {
        const response = await axiosInstance.get(QUERIES.admin.users.GET_ALL, {
            params: {
                page,
                limit
            }
        })
        return response.data
    }
}