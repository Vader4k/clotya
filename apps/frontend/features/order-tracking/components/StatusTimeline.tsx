"use client";

import { OrderStatus } from "../types/tracking.types";
import { Package, Truck, CheckCircle2, XCircle, Clock, Cog } from "lucide-react";

const STEPS: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
    { status: "pending", label: "Pending", icon: Clock },
    { status: "processing", label: "Processing", icon: Cog },
    { status: "shipped", label: "Shipped", icon: Truck },
    { status: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const getStepIndex = (status: OrderStatus) => {
    if (status === "cancelled") return -1;
    return STEPS.findIndex((s) => s.status === status);
};

const StatusTimeline = ({ status }: { status: OrderStatus }) => {
    const currentIndex = getStepIndex(status);
    const isCancelled = status === "cancelled";

    return (
        <div className="w-full">
            {/* Desktop horizontal timeline */}
            <div className="hidden sm:block">
                <div className="flex items-center justify-between relative">
                    {STEPS.map((step, index) => {
                        const isCompleted = !isCancelled && index < currentIndex;
                        const isCurrent = !isCancelled && index === currentIndex;
                        const isFuture = isCancelled || index > currentIndex;

                        const Icon = step.icon;

                        return (
                            <div key={step.status} className="flex flex-col items-center relative z-10 flex-1">
                                {/* Connector line (before this step) */}
                                {index > 0 && (
                                    <div
                                        className="absolute top-5 right-1/2 h-[2px] w-full -z-10"
                                        style={{
                                            background: isCompleted || isCurrent
                                                ? "#000"
                                                : "#e5e5e5",
                                            backgroundImage: isFuture
                                                ? "repeating-linear-gradient(90deg, #d4d4d4 0, #d4d4d4 6px, transparent 6px, transparent 12px)"
                                                : "none",
                                        }}
                                    />
                                )}

                                {/* Circle */}
                                <div
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                                        ${isCompleted ? "bg-black text-white" : ""}
                                        ${isCurrent ? "bg-black text-white ring-4 ring-black/10" : ""}
                                        ${isFuture ? "bg-gray-100 text-gray-400 border border-gray-200" : ""}
                                    `}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 size={18} strokeWidth={2} />
                                    ) : (
                                        <Icon size={18} strokeWidth={1.5} />
                                    )}
                                </div>

                                {/* Label */}
                                <p
                                    className={`
                                        mt-2 text-xs font-medium transition-colors
                                        ${isCompleted || isCurrent ? "text-black" : "text-gray-400"}
                                    `}
                                >
                                    {step.label}
                                </p>

                                {/* Current pulse indicator */}
                                {isCurrent && (
                                    <div className="absolute top-0 w-10 h-10 rounded-full bg-black/20 animate-ping" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile vertical timeline */}
            <div className="sm:hidden">
                <div className="flex flex-col gap-0">
                    {STEPS.map((step, index) => {
                        const isCompleted = !isCancelled && index < currentIndex;
                        const isCurrent = !isCancelled && index === currentIndex;
                        const isFuture = isCancelled || index > currentIndex;

                        const Icon = step.icon;

                        return (
                            <div key={step.status} className="flex items-start gap-3">
                                {/* Left column: circle + connector */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`
                                            w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 relative
                                            ${isCompleted ? "bg-black text-white" : ""}
                                            ${isCurrent ? "bg-black text-white ring-4 ring-black/10" : ""}
                                            ${isFuture ? "bg-gray-100 text-gray-400 border border-gray-200" : ""}
                                        `}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 size={14} strokeWidth={2} />
                                        ) : (
                                            <Icon size={14} strokeWidth={1.5} />
                                        )}
                                        {isCurrent && (
                                            <div className="absolute inset-0 rounded-full bg-black/20 animate-ping" />
                                        )}
                                    </div>

                                    {/* Vertical connector */}
                                    {index < STEPS.length - 1 && (
                                        <div
                                            className={`w-[2px] h-8 ${
                                                isCompleted ? "bg-black" : "bg-gray-200"
                                            }`}
                                            style={
                                                isFuture
                                                    ? {
                                                          backgroundImage:
                                                              "repeating-linear-gradient(180deg, #d4d4d4 0, #d4d4d4 4px, transparent 4px, transparent 8px)",
                                                          background: "none",
                                                          backgroundSize: "2px 8px",
                                                      }
                                                    : {}
                                            }
                                        />
                                    )}
                                </div>

                                {/* Right column: label */}
                                <p
                                    className={`
                                        text-sm font-medium pt-1.5 transition-colors
                                        ${isCompleted || isCurrent ? "text-black" : "text-gray-400"}
                                    `}
                                >
                                    {step.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Cancelled state */}
            {isCancelled && (
                <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 text-sm">
                    <XCircle size={16} strokeWidth={1.5} />
                    <p className="font-medium">This order has been cancelled</p>
                </div>
            )}
        </div>
    );
};

export default StatusTimeline;
