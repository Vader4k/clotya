import { QUERIES } from '@/queries/queries';
import { processUrlVariables } from '@/lib/utils';
import { BillingDetailsType } from '../schema/checkout.schema';
import axiosInstance from "@/lib/http/axios";

export const checkoutServices = {
    //initialize checkout
    async checkout(data: BillingDetailsType) {
        const response = await axiosInstance.post(QUERIES.order.CHECKOUT, data)
        return response.data
    },

    async verify(reference: string) {
        const url = processUrlVariables(QUERIES.order.VERIFY_ORDER, { reference })
        const response = await axiosInstance.get(url)
        return response.data
    }
}