
type Stats = {
    activeOrders: number,
    totalRevenue: number,
    totalUsers: number
}

type chartData = {
    name: string,
    total: number
}

export type QuickStatApiResponse = {
    data: Stats,
    message: string,
    success: boolean,
}

export type RevenueOverviewResponse = {
    data: chartData[]
    message: string,
    success: boolean,
}

export type TooltipPayload = {
    active?: boolean;
    label?: string;
    payload?: { value?: number }[];
};