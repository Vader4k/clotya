import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";
import { ProfileSchemaType, PasswordSchemaType, AddressSchemaType } from '../schema/accountSchema';

export const accountService = {
    updateProfile: async (data: ProfileSchemaType | AddressSchemaType) => {
        const response = await axiosInstance.put(QUERIES.user.Profile, data)
        return response.data
    },

    updatePassword: async (data: PasswordSchemaType) => {
        const response = await axiosInstance.put(QUERIES.user.password, data)
        return response.data
    },

    orders: async () => {
        const response = await axiosInstance.get(QUERIES.user.orders)
        return response.data.orders
    }
}