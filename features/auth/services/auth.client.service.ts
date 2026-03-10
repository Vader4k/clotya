import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";
import { LoginSchemaType } from "@/schema/loginSchema";

export const authClientService = {
    login: async (data: LoginSchemaType) => {
        const response = await axiosInstance.post(QUERIES.LOGIN, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    },
    register: async (data: any) => {
        const response = await axiosInstance.post(QUERIES.REGISTER, data, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    },
    logout: async () => {
        const response = await axiosInstance.post(QUERIES.LOGOUT);
        return response.data;
    },
    me: async () => {
        const response = await axiosInstance.get(QUERIES.ME);
        return response.data;
    },
}