import { useQuery } from "@tanstack/react-query"
import { usersServices } from "../services/users.service"

export const useGetAllUsers = ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => {
    return useQuery({
        queryKey: ["users", page, limit],
        queryFn: () => usersServices.getAllUsers({ page, limit }),
    })
}