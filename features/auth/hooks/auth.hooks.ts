import { authClientService } from "../services/auth.client.service"
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import { QUERIES } from "@/queries/queries"
import { LoginSchemaType } from "@/schema/loginSchema"

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginSchemaType) => {
            const response = await authClientService.login(data)
            return response.data
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await authClientService.register(data)
            return response.data
        }
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await authClientService.logout()
            return response.data
        }
    })
}

export const useMe = () => {
    const me = async () => {
        const response = await authClientService.me()
        return response.data
    }
    const { data, isLoading, error }: UseQueryResult<any, Error> = useQuery({
        queryKey: [QUERIES.ME],
        queryFn: me,
        enabled: false,
        retry: false
    })
    return { data, isLoading, error }
}
