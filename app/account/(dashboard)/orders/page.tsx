import { Metadata } from "next";
import OrderList from "@/features/accounts/components/OrderList";

export const metadata: Metadata = {
    title: "Orders",
    description: "View your order history.",
};

export default function OrdersPage() {
    return (
        <div className="space-y-6">
            <div className="bg-neutral-50 p-6 border border-neutral-200">
                <h2 className="text-xl font-medium text-black">Order History</h2>
                <p className="text-neutral-500 mt-2 text-sm">
                    View and track your recent orders.
                </p>
            </div>

            <OrderList />
        </div>
    );
}
