"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, Settings, LogOut } from "lucide-react";
import { accountClientService } from "../services/account.client.service";
import { toast } from "sonner";

const navigation = [
    { name: "Dashboard", href: "/account", icon: User },
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Settings", href: "/account/settings", icon: Settings },
];

export default function AccountSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await accountClientService.logout();
            toast.success(res.message);
            router.push('/account/login');
        } catch {
            toast.error("Failed to log out");
        }
    };

    return (
        <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                isActive 
                                    ? "bg-black text-white" 
                                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                            }`}
                        >
                            <item.icon className="size-5" />
                            {item.name}
                        </Link>
                    );
                })}
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                    <LogOut className="size-5" />
                    Logout
                </button>
            </nav>
        </aside>
    );
}
