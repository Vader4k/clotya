"use client";

import { useGetOrders } from "../hooks/account.hooks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import OrderLoading from "./OrderLoading";
import OrderError from "./OrderError";
import OrderEmpty from "./OrderEmpty";
import { useCurrency } from "@/features/currency/context/CurrencyContext";

export default function OrderList() {
  const { data: orders, isLoading, isError, refetch } = useGetOrders();
  const { formatPrice } = useCurrency();

  if (isLoading) return <OrderLoading />;
  if (isError) return <OrderError refetch={refetch} />;
  if (!orders || orders.length === 0) return <OrderEmpty />;

  return (
    <div className="space-y-6">
      {/* Desktop View */}
      <div className="hidden lg:block border border-neutral-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 hover:bg-neutral-50">
              <TableHead className="px-6 py-4 font-medium text-black">Order ID</TableHead>
              <TableHead className="px-6 py-4 font-medium text-black">Date</TableHead>
              <TableHead className="px-6 py-4 font-medium text-black">Items</TableHead>
              <TableHead className="px-6 py-4 font-medium text-black">Status</TableHead>
              <TableHead className="px-6 py-4 font-medium text-black">Payment/Shipment</TableHead>
              <TableHead className="px-6 py-4 font-medium text-black text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderNumber} className="hover:bg-neutral-50/50 transition-colors align-top">
                <TableCell className="px-6 py-4 font-medium text-primary">#{order.orderNumber}</TableCell>
                <TableCell className="px-6 py-4 text-neutral-600">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-xs text-neutral-600 flex items-center gap-2">
                        <span className="font-medium text-black">{item.quantity}x</span>
                        <span className="truncate max-w-[150px]">{item.name}</span>
                        {item.size && <span className="text-neutral-400 uppercase">({item.size})</span>}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Badge variant={order.isPaid ? "success" : "warning"} className="w-fit text-[10px]">
                      {order.isPaid ? "Paid" : "Pending Payment"}
                    </Badge>
                    {order.isDelivered && (
                      <Badge variant="success" className="w-fit text-[10px]">
                        Delivered
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                   <div className="text-xs space-y-1">
                      <p className="text-neutral-600 capitalize">{order.paymentType.replace('_', ' ')}</p>
                      <p className="text-neutral-400 text-[10px] capitalize">{order.shipmentType.replace('_', ' ')}</p>
                   </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-right font-semibold text-black">
                  {formatPrice(order.totalPrice)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {orders.map((order) => (
          <div 
            key={order.orderNumber} 
            className="border border-neutral-200 bg-white p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-medium text-primary text-sm">#{order.orderNumber}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={order.isPaid ? "success" : "warning"} className="text-[10px] px-1.5 py-0">
                  {order.isPaid ? "Paid" : "Pending"}
                </Badge>
                {order.isDelivered && (
                   <Badge variant="success" className="text-[10px] px-1.5 py-0">
                    Delivered
                   </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2 py-2">
               {order.items.map((item, idx) => (
                 <div key={idx} className="flex justify-between text-xs">
                    <span className="text-neutral-600">{item.quantity}x {item.name}</span>
                    <span className="text-neutral-400">{formatPrice(item.price * item.quantity)}</span>
                 </div>
               ))}
            </div>
            
            <div className="pt-4 border-t border-neutral-100 space-y-2">
               <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 capitalize">{order.paymentType.replace('_', ' ')} / {order.shipmentType.replace('_', ' ')}</span>
                  <div className="space-x-1">
                    <span className="text-neutral-500">Total: </span>
                    <span className="font-bold text-black">{formatPrice(order.totalPrice)}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
