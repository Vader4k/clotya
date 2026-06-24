import { authClientService } from "../services/auth.client.service"
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { QUERIES } from "@/queries/queries"
import { LoginSchemaType } from "@/schema/loginSchema"
import { UserData, MeResponse, LoginResponse } from "../types/auth.types"

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: LoginSchemaType): Promise<LoginResponse> => {
            const response = await authClientService.login(data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.ME] })
        }
    })
}

export const useRegister = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await authClientService.register(data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.ME] })
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await authClientService.logout()
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.ME] })
        }
    })
}

export const useMe = () => {
    return useQuery({
        queryKey: [QUERIES.ME],
        queryFn: async (): Promise<UserData | null> => {
            try {
                const response: MeResponse = await authClientService.me()
                return response.user
            } catch (error) {
                return null
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: false
    })
}
