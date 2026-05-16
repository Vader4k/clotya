import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 border border-neutral-200 text-center px-4">
      <div className="size-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-neutral-100">
        <PackageOpen className="size-10 text-neutral-300" />
      </div>
      <h3 className="text-xl font-medium text-black mb-2">No orders found</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-8 leading-relaxed">
        It looks like you haven&apos;t placed any orders yet. Once you do, they will appear here for you to track and manage.
      </p>
      <Button asChild size="lg" className="rounded-none px-8">
        <Link href="/shop">
          Start Shopping
        </Link>
      </Button>
    </div>
  );
}
