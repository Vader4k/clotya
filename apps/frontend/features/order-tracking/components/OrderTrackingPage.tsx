"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TrackingForm from "@/features/order-tracking/components/TrackingForm"
import TrackingResult from "@/features/order-tracking/components/TrackingResult"
import { TrackedOrder } from "@/features/order-tracking/types/tracking.types"

const OrderTrackingPage = () => {
    const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null)

    return (
        <div className="w-full max-w-3xl mx-auto font-jost">
            <AnimatePresence mode="wait">
                {trackedOrder ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TrackingResult
                            order={trackedOrder}
                            onTrackAnother={() => setTrackedOrder(null)}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-sm lg:text-base mb-5">
                            To track your order please enter your Order Number and the email you used during checkout, then press &quot;Track Order&quot;.
                        </p>
                        <TrackingForm onResult={setTrackedOrder} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default OrderTrackingPage
