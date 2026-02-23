import { ListFilter } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCategories } from "@/features/categories/hooks/useCategories";
import FiltersPanel from "@/features/products/components/FiltersPanel";

const FilterSheet = () => {
    const { data: categories } = useCategories();

    if (!categories) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <ListFilter size={25} strokeWidth={0.7} />
                <p className="text-[0.6rem] uppercase font-medium">Filter</p>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                    <SheetDescription>Filter products</SheetDescription>
                </SheetHeader>
                <div className="px-4 overflow-y-scroll no-scrollbar pb-4">
                    <FiltersPanel categories={categories} />
                </div>
                <SheetFooter className="px-6">
                    <p className="text-xs text-gray-500">Copyright © 2026 Clotya. All rights reserved.</p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default FilterSheet