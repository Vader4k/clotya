"use client";

import { useEffect, useState } from "react";
import { accountClientService } from "@/features/accounts/services/account.client.service";
import Link from "next/link";
import { Package, Settings, MapPin } from "lucide-react";
import { ProfileSchemaType } from "@/features/accounts/schema/accountSchema";

export default function AccountOverviewPage() {
  const [user, setUser] = useState<ProfileSchemaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await accountClientService.getProfile();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-20 bg-neutral-100 w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-neutral-100"></div>
          <div className="h-32 bg-neutral-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-neutral-50 p-6 border border-neutral-200">
        <h2 className="text-xl font-medium text-black">
          Hello, {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-neutral-500 mt-2 text-sm">
          From your account dashboard you can view your recent orders, manage
          your shipping addresses, and edit your password and account details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/account/orders"
          className="flex flex-col items-center justify-center gap-3 p-6 border border-neutral-200 hover:border-gray-400 transition-colors bg-white"
        >
          <Package className="size-8 text-neutral-400" strokeWidth={1}/>
          <span className="font-medium text-sm text-black">Orders</span>
        </Link>

        <Link
          href="/account/settings"
          className="flex flex-col items-center justify-center gap-3 p-6 border border-neutral-200 hover:border-gray-400 transition-colors bg-white"
        >
          <Settings className="size-8 text-neutral-400" strokeWidth={1}/>
          <span className="font-medium text-sm text-black">Account Details</span>
        </Link>

        <Link
          href="/account/settings"
          className="flex flex-col items-center justify-center gap-3 p-6 border border-neutral-200 hover:border-gray-400 transition-colors bg-white"
        >
          <MapPin className="size-8 text-neutral-400" strokeWidth={1}/>
          <span className="font-medium text-sm text-black">Addresses</span>
        </Link>
      </div>
    </div>
  );
}
