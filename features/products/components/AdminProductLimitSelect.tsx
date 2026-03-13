import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AdminProductLimitSelectProps } from "../types/product.types"

export const AdminProductLimitSelect = ({ limit, onLimitChange }: AdminProductLimitSelectProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">Show:</span>
            <Select value={limit.toString()} onValueChange={onLimitChange}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
