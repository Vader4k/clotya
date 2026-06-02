"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useTrackOrder } from "../hooks/tracking.hooks"
import { TrackedOrder } from "../types/tracking.types"
import { Loader2, Search } from "lucide-react"

const TrackingForm = ({
    onResult,
}: {
    onResult: (order: TrackedOrder) => void;
}) => {
    const [trackingInfo, setTrackingInfo] = useState({
        orderNumber: "",
        email: ""
    })
    const [error, setError] = useState<string | null>(null)

    const { mutate: trackOrder, isPending } = useTrackOrder()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTrackingInfo(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!trackingInfo.orderNumber.trim() || !trackingInfo.email.trim()) {
            setError("Please enter both your order number and email.")
            return
        }

        trackOrder(
            {
                orderNumber: trackingInfo.orderNumber.trim(),
                email: trackingInfo.email.trim(),
            },
            {
                onSuccess: (order) => {
                    onResult(order)
                },
                onError: (err: any) => {
                    const message =
                        err?.response?.data?.message ||
                        "We couldn't find an order with that information. Please check and try again."
                    setError(message)
                },
            }
        )
    }

    return (
        <form className="font-jost" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="orderNumber" className="text-sm">Order Number</label>
                    <Input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={trackingInfo.orderNumber}
                        className="py-5 rounded-none"
                        onChange={handleChange}
                        placeholder="e.g. ORD-1717200000000-A1B2C"
                        disabled={isPending}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={trackingInfo.email}
                        className="py-5 rounded-none"
                        onChange={handleChange}
                        placeholder="Email you used during checkout"
                        disabled={isPending}
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5">
                        {error}
                    </p>
                )}

                <button
                    className="bg-black text-white font-medium px-6 py-3 w-fit flex items-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Tracking...
                        </>
                    ) : (
                        <>
                            <Search size={16} strokeWidth={1.5} />
                            Track Order
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default TrackingForm