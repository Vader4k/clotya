import { QUERIES } from "@/queries/queries";
import axiosInstance from "@/lib/http/axios";
import { processUrlVariables } from "@/lib/utils";

export const orderServices = {
    getAdminOrders: async () => {
        const response = await axiosInstance.get(QUERIES.admin.orders.GET)
        return response.data.orders
    },

    updateOrderStatus: async ({ orderId, status }: { orderId: string; status: string }) => {
        const response = await axiosInstance.put(processUrlVariables(QUERIES.admin.orders.UPDATE, { id: orderId }), { status })
        return response.data
    }
}