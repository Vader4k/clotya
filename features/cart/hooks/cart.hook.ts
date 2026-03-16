import { QUERIES } from "@/queries/queries";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../services/cart.service";
import { CartItem, AddToCartPayload } from "../types/cart.types";
import { toast } from "sonner";
import { errorHandler } from "@/lib/http/errorHandler";

export const useCartHook = (): UseQueryResult<CartItem[]> => {
    return useQuery({
        queryKey: [QUERIES.cart.GET],
        queryFn: () => cartService.getCart()
    })
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cartItem: AddToCartPayload) => cartService.addToCart(cartItem),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.cart.GET] });
            toast.success("Added to cart");
        },
        onError: (error) => {
            errorHandler(error)
        }
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => cartService.deleteCartItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.cart.GET] });
            toast.success("Removed from cart");
        },
        onError: (error) => {
            errorHandler(error)
        }
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => cartService.deleteAllCart(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.cart.GET] });
            toast.success("Cart cleared");
        },
        onError: (error) => {
            errorHandler(error)
        }
    });
};