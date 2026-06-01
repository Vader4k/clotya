import { Metadata } from "next";
import AccountSidebar from "@/features/accounts/components/AccountSidebar";
import AccountAuthGuard from "@/features/auth/components/AccountAuthGuard";

export const metadata: Metadata = {
    title: {
        template: "%s | My Account",
        default: "My Account",
    },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AccountAuthGuard>
            <div className="w-full max-w-7xl mx-auto px-4 py-10 md:py-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-jost font-medium">My Account</h1>
                </div>

                <div className="flex flex-col gap-8 md:flex-row md:items-start">
                    <AccountSidebar />
                    <main className="flex-1 w-full min-h-125">
                        {children}
                    </main>
                </div>
            </div>
        </AccountAuthGuard>
    );
}
