import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AdminProductSearchProps } from '../types/product.types'

export const AdminProductSearch = ({ value, onChange }: AdminProductSearchProps) => {
    return (
        <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
                placeholder="Search products..."
                className="pl-9"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
