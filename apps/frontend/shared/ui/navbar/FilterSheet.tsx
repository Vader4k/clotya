import { ListFilter } from "lucide-react"
import { useCategories } from "@/features/categories/hooks/useCategories";
import FiltersPanel from "@/features/products/components/FiltersPanel";
import { NativeSheet } from "./NativeSheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const FilterSheet = () => {
    const { data: categories } = useCategories();

    if (!categories) {
        return null;
    }

    return (
        <NativeSheet
            side="left"
            title="Filter"
            trigger={
                <div className="flex flex-col items-center justify-center">
                    <ListFilter size={25} strokeWidth={0.7} />
                    <p className="text-[0.6rem] uppercase font-medium">Filter</p>
                </div>
            }
        >
            {/* Scrollable filter content */}
            <ScrollArea className="flex-1 min-h-0">
                <div className="px-4 pb-4">
                    <FiltersPanel categories={categories} />
                </div>
            </ScrollArea>

            {/* Footer */}
            <div className="mt-auto px-6 py-4 shrink-0">
                <p className="text-xs text-gray-500">Copyright © 2026 Clotya. All rights reserved.</p>
            </div>
        </NativeSheet>
    )
}

export default FilterSheet