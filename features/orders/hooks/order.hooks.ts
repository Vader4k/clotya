import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderServices } from "../services/orders.service";
import { QUERIES } from "@/queries/queries";
import { Order, OrderStatus } from "../types/order.types";

export const useGetAdminOrders = () => {
    return useQuery<Order[]>({
        queryKey: [QUERIES.admin.orders.GET],
        queryFn: () => orderServices.getAdminOrders(),
    })
}

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) => 
            orderServices.updateOrderStatus({ orderId, status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.admin.orders.GET] });
        }
    })
}
