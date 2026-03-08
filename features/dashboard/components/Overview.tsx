import React from 'react'
import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react'

const STATS = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", isPositive: true, icon: DollarSign },
    { title: "Active Orders", value: "356", change: "+12.5%", isPositive: true, icon: ShoppingBag },
    { title: "Total Customers", value: "2,405", change: "+4.3%", isPositive: true, icon: Users },
    { title: "Active Now", value: "48", change: "-1.2%", isPositive: false, icon: Activity },
]

export const Overview = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back. Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <Icon className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Placeholder for Recent Activity/Charts */}
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
                    <div className="mt-4 flex h-[300px] items-center justify-center rounded-lg bg-gray-50 border border-dashed border-gray-300">
                        <p className="text-sm text-gray-500">Chart Visualization Placeholder</p>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-medium text-gray-900">Recent Sales</h3>
                    <div className="mt-4 space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-full bg-gray-200" />
                                <div className="flex-1 space-y-1">
                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                                    <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
                                </div>
                                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
