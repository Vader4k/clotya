import { authClientService } from "../services/auth.client.service"
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import { QUERIES } from "@/queries/queries"
import { LoginSchemaType } from "@/schema/loginSchema"
import { UserData, MeResponse, LoginResponse } from "../types/auth.types"

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginSchemaType): Promise<LoginResponse> => {
            const response = await authClientService.login(data)
            return response
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await authClientService.register(data)
            return response
        }
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await authClientService.logout()
            return response
        }
    })
}

export const useMe = () => {
    const me = async (): Promise<UserData> => {
        const response: MeResponse = await authClientService.me()
        return response.user
    }
    const { data, isLoading, error }: UseQueryResult<UserData> = useQuery({
        queryKey: [QUERIES.ME],
        queryFn: me,
        retry: false
    })
    return { data, isLoading, error }
}
