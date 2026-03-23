import { Metadata } from "next";
import AccountSidebar from "@/features/accounts/components/AccountSidebar";

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
        <div className="w-full max-w-7xl mx-auto px-4 py-10 md:py-16">
            <div className="mb-8">
                <h1 className="text-3xl font-jost font-medium">My Account</h1>
            </div>
            
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
                <AccountSidebar />
                <main className="flex-1 w-full min-h-[500px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
