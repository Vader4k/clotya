import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { usersServices } from "../services/users.service"
import { UsersResponse, UsersQuery } from "../types/users.types"
import { toast } from "sonner"

export const useGetAllUsers = ({ page = 1, limit = 10, search = "" }: UsersQuery): UseQueryResult<UsersResponse> => {
    return useQuery({
        queryKey: ["users", page, limit, search],
        queryFn: () => usersServices.getAllUsers({ page, limit, search }),
    })
}

export const useToggleUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: usersServices.toggleUserStatus,
        onSuccess: (data) => {
            toast.success(data.message || "User status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update user status");
        }
    })
}