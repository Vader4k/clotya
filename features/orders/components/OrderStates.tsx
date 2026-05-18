"use client"

import { Loader2, AlertCircle, PackageX, RotateCw } from 'lucide-react'
import { OrderErrorProps, OrderEmptyProps } from '../types/order.types'

export const OrderLoading = () => {
    return (
        <div className="w-full border border-gray-200 rounded-xl bg-white p-12 flex flex-col items-center justify-center min-h-[350px] space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="space-y-1 text-center">
                <p className="text-sm font-medium text-gray-900">Loading orders...</p>
                <p className="text-xs text-gray-500">Retrieving the latest customer transactions</p>
            </div>
        </div>
    )
}

export const OrderError = ({ onRetry, message = "Failed to load orders. Please try again." }: OrderErrorProps) => {
    return (
        <div className="w-full border border-red-200 rounded-xl bg-red-50/50 p-12 flex flex-col items-center justify-center min-h-[350px] space-y-4">
            <div className="h-12 w-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600">
                <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-center max-w-sm">
                <p className="text-sm font-medium text-red-900">Something went wrong</p>
                <p className="text-xs text-red-600">{message}</p>
            </div>
            <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors rounded-lg border border-red-700"
            >
                <RotateCw className="h-3.5 w-3.5" />
                Retry
            </button>
        </div>
    )
}

export const OrderEmpty = ({ onReset, hasSearch }: OrderEmptyProps) => {
    return (
        <div className="w-full border border-gray-200 rounded-xl bg-white p-12 flex flex-col items-center justify-center min-h-[350px] space-y-4">
            <div className="h-12 w-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                <PackageX className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-center max-w-sm">
                <p className="text-sm font-medium text-gray-900">No orders found</p>
                <p className="text-xs text-gray-500">
                    {hasSearch 
                        ? "We couldn't find any orders matching your search query. Try checking for typos or using different keywords."
                        : "There are currently no orders in the system. When customers place orders, they will appear here."}
                </p>
            </div>
            {hasSearch && onReset && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors rounded-lg border border-gray-300"
                >
                    Clear search
                </button>
            )}
        </div>
    )
}
