import axiosInstance from "@/lib/http/axios";
import { QUERIES } from "@/queries/queries";
import { processUrlVariables } from "@/lib/utils";
import { AddToCartPayload } from "../types/cart.types";

export const cartService = {
    async getCart() {
        const response = await axiosInstance.get(QUERIES.cart.GET);
        return response.data.cart.items;
    },
    async addToCart(cartItem: AddToCartPayload) {
        const response = await axiosInstance.post(QUERIES.cart.ADD, cartItem);
        return response.data;
    },
    async deleteCartItem(id: string) {
        const response = await axiosInstance.delete(processUrlVariables(QUERIES.cart.REMOVE, { id }));
        return response.data;
    },
    async deleteAllCart() {
        const response = await axiosInstance.delete(QUERIES.cart.REMOVE_ALL);
        return response.data;
    },
};