"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Tags,
    Package,
    ShoppingCart,
    Settings,
    LogOut
} from "lucide-react"
import { SIDEBAR_LINKS } from "@/constants"


export const Sidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform">
            <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
                <div className="mb-6 px-3">
                    <Link href="/admin" className="flex items-center">
                        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
                            Clotya <span className="text-primary">Admin</span>
                        </span>
                    </Link>
                </div>

                <ul className="space-y-2 font-medium flex-1">
                    {SIDEBAR_LINKS.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))

                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center rounded-lg p-2 text-sm text-gray-900 hover:bg-gray-100 ${isActive ? "bg-gray-100 text-primary" : ""
                                        }`}
                                >
                                    <Icon strokeWidth={1} className={`h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-gray-500"}`} />
                                    <span className="ml-3">{link.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <ul className="mt-auto space-y-2 font-medium pt-4 border-t border-gray-200">
                    <li>
                        <Link
                            href="/admin/settings"
                            className="flex items-center rounded-lg p-2 text-sm text-gray-900 hover:bg-gray-100"
                        >
                            <Settings strokeWidth={1} className="h-5 w-5 text-gray-500 transition-colors" />
                            <span className="ml-3">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            className="flex w-full items-center rounded-lg p-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut strokeWidth={1} className="h-5 w-5 transition-colors" />
                            <span className="ml-3">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
