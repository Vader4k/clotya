"use client";

import dynamic from "next/dynamic";
import { TrackedOrder } from "../types/tracking.types";
import StatusTimeline from "./StatusTimeline";
import TrackedOrderSummary from "./TrackedOrderSummary";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Dynamically import the map component to avoid SSR issues with Leaflet
const TrackingMap = dynamic(() => import("./TrackingMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[350px] sm:h-[400px] border bg-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-gray-400">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                <p className="text-xs">Loading map...</p>
            </div>
        </div>
    ),
});

const TrackingResult = ({
    order,
    onTrackAnother,
}: {
    order: TrackedOrder;
    onTrackAnother: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6"
        >
            {/* Back / Track Another */}
            <button
                onClick={onTrackAnother}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors w-fit"
            >
                <ArrowLeft size={14} strokeWidth={1.5} />
                Track another order
            </button>

            {/* Status Timeline */}
            <div className="border p-5 sm:p-6">
                <StatusTimeline status={order.status} />
            </div>

            {/* Map */}
            <TrackingMap order={order} />

            {/* Order Summary */}
            <TrackedOrderSummary order={order} />
        </motion.div>
    );
};

export default TrackingResult;
