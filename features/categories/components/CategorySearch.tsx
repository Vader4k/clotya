import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const CategorySearch = ({ searchTerm, setSearchTerm }: {
    searchTerm: string
    setSearchTerm: (s: string) => void
}) => {
    return (
        <div className="border-b border-gray-200 p-4">
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search categories (name or slug)..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default CategorySearch