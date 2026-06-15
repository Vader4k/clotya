import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";
import { UsersQuery, UsersResponse } from "../types/users.types";

export const usersServices = {
    getAllUsers: async ({ page = 1, limit = 10, search = "" }: UsersQuery): Promise<UsersResponse> => {
        const response = await axiosInstance.get(QUERIES.admin.users.GET_ALL, {
            params: {
                page,
                limit,
                search
            }
        })
        return response.data
    },
    toggleUserStatus: async ({ id, isActive }: { id: string; isActive: boolean }) => {
        const url = QUERIES.admin.users.TOGGLE_STATUS.replace(":id", id);
        const response = await axiosInstance.put(url, { isActive });
        return response.data;
    }
}