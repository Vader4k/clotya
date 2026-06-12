"use client"

import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useRevenueOverview } from "@/features/overview/hooks/overview.hooks";
import LoadingChart from "./LoadingChart";
import Error from "./Error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TooltipPayload } from "../types";
import { formatCurrency, formatXLabel } from "../utils";

const RANGES = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "12m", label: "Last 12 months" },
] as const;


const CustomTooltip = ({ active, payload, label }: TooltipPayload) => {
    if (!active || !payload?.length) return null;
    const d = new Date(label ?? "");
    const date = isNaN(d.getTime())
        ? (label ?? "")
        : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3.5 py-2.5 text-xs">
            <p className="text-gray-400 mb-1.5">{date}</p>
            <p className="font-semibold text-gray-900 text-sm">
                {formatCurrency(payload[0].value ?? 0)}
            </p>
        </div>
    );
};

const Chart = () => {
    const [range, setRange] = useState<"7d" | "30d" | "12m">("30d");
    const { data, isLoading, isError, refetch } = useRevenueOverview({ range });

    if (isLoading) return <LoadingChart />;

    if (isError) {
        return (
            <div className="mt-8">
                <Error refetch={refetch} />
            </div>
        );
    }

    const chartData = data?.data ?? [];

    // Determine x-axis tick frequency to avoid crowding
    const maxTicks = range === "12m" ? 12 : range === "30d" ? 8 : 7;
    const step = Math.max(1, Math.ceil(chartData.length / maxTicks));
    const tickFormatter = (name: string, index: number) =>
        index % step === 0 ? formatXLabel(name, range) : "";

    return (
        <div className="mt-8 border border-gray-200 bg-white p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Revenue Overview</h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Total revenue for the selected period
                    </p>
                </div>

                <Select value={range} onValueChange={(v) => setRange(v as typeof range)}>
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-white text-gray-700">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                        {RANGES.map((r) => (
                            <SelectItem key={r.value} value={r.value}>
                                {r.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-sm text-gray-400">
                    No data available for the selected period.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#111827" stopOpacity={0.12} />
                                <stop offset="100%" stopColor="#111827" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#f3f4f6"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                            tickFormatter={(name, i) => tickFormatter(name, i)}
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                            axisLine={false}
                            tickLine={false}
                            dy={8}
                        />

                        <YAxis
                            tickFormatter={formatCurrency}
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                            axisLine={false}
                            tickLine={false}
                            width={48}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: "#e5e7eb", strokeWidth: 1, strokeDasharray: "4 4" }}
                        />

                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#111827"
                            strokeWidth={2}
                            fill="url(#revenueGradient)"
                            dot={false}
                            activeDot={{ r: 4, fill: "white", stroke: "#111827", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Chart;
