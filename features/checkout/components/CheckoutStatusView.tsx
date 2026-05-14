"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, ShoppingBag, ReceiptText } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "@/queries/queries";

interface CheckoutStatusViewProps {
  status: "success" | "failed" | "error";
  reference: string;
  message?: string;
}

const CheckoutStatusView = ({ status, reference, message }: CheckoutStatusViewProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "success") {
      // Invalidate cart to ensure it's cleared in the UI
      queryClient.invalidateQueries({ queryKey: [QUERIES.cart.GET] });
    }
  }, [status, queryClient]);

  const isSuccess = status === "success";

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gray-50/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] p-10 text-center border border-gray-100"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            className="relative"
          >
            {isSuccess ? (
              <>
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
                <div className="bg-green-50 p-6 rounded-full relative">
                  <CheckCircle2 className="size-16 text-green-500" strokeWidth={1.5} />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30" />
                <div className="bg-red-50 p-6 rounded-full relative">
                  <XCircle className="size-16 text-red-500" strokeWidth={1.5} />
                </div>
              </>
            )}
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-3 font-jost"
        >
          {isSuccess ? "Order Confirmed!" : "Payment Failed"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-10 font-inter leading-relaxed"
        >
          {isSuccess
            ? message || "Thank you for shopping with Clotya. Your order has been placed successfully and we'll notify you once it ships."
            : message || "We were unable to process your payment. Please check your card details or try an alternative payment method."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50/80 rounded-[1.5rem] p-6 mb-10 space-y-3"
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">Reference</span>
            <span className="font-mono font-bold text-gray-700 tracking-tight">{reference}</span>
          </div>
          <div className="h-px bg-gray-200/50 w-full" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px]">Status</span>
            <span className={`font-bold text-[11px] px-3 py-1 rounded-full uppercase ${
              isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {status}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4"
        >
          {isSuccess ? (
            <>
              <Link
                href="/order-tracking"
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-none hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-gray-200"
              >
                <ReceiptText className="size-5" />
                <span>Track My Order</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop"
                className="w-full bg-white text-gray-700 border border-gray-200 font-bold py-4.5 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="size-5" />
                <span>Continue Shopping</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/checkout"
                className="w-full bg-[#ed2024] text-white font-bold py-3 rounded-none hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-100"
              >
                Try Payment Again
              </Link>
              <Link
                href="/cart"
                className="w-full bg-white text-gray-700 border border-gray-200 font-bold py-4.5 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Back to Shopping Bag
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheckoutStatusView;
