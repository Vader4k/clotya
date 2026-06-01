import { Skeleton } from "@/components/ui/skeleton"

type MorphSkeletonVariant = "categoryTable" | "productTable" | "shopGrid" | "productDetails" | "blogGrid" | "blogDetails"

interface MorphSkeletonProps {
    variant: MorphSkeletonVariant
    rows?: number
}

const CategoryTableSkeleton = ({ rows = 4 }: { rows: number }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {["Name", "Slug", "Description", "Items", "Status", "Actions"].map((header) => (
                            <th key={header} scope="col" className="px-6 py-4 font-medium text-xs uppercase text-gray-700">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-28 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-24 rounded" />
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <Skeleton className="h-4 w-44 rounded" />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <Skeleton className="h-4 w-8 mx-auto rounded" />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-3">
                                    <Skeleton className="size-4 rounded" />
                                    <Skeleton className="size-4 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const ProductTableSkeleton = ({ rows = 4 }: { rows: number }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 uppercase text-xs text-gray-700">
                    <tr>
                        {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((header) => (
                            <th key={header} scope="col" className="px-6 py-4 font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="size-10 rounded" />
                                    <Skeleton className="h-4 w-28 rounded" />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-24 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-16 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <Skeleton className="h-4 w-8 rounded" />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-3">
                                    <Skeleton className="size-4 rounded" />
                                    <Skeleton className="size-4 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const ShopGridSkeleton = ({ rows = 8 }: { rows: number }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                    <Skeleton className="aspect-3/4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/4 rounded" />
                </div>
            ))}
        </div>
    )
}

const ProductDetailsSkeleton = () => {
    return (
        <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-10">
            <div className="w-full xl:max-w-[45%] flex flex-col gap-4">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="flex gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="size-20 rounded-md" />
                    ))}
                </div>
            </div>
            <div className="w-full xl:max-w-[35%] flex flex-col gap-6">
                <Skeleton className="h-8 w-3/4 rounded" />
                <Skeleton className="h-6 w-1/4 rounded" />
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="size-4 rounded-full" />
                    ))}
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
            <div className="w-full xl:max-w-[20%] space-y-4">
                <Skeleton className="h-6 w-1/2 rounded" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <Skeleton className="size-16 rounded" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-full rounded" />
                            <Skeleton className="h-3 w-1/2 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const BlogGridSkeleton = ({ rows = 6 }: { rows: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <div className="flex gap-2">
                        <Skeleton className="h-3 w-16 rounded" />
                        <Skeleton className="h-3 w-16 rounded" />
                    </div>
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                </div>
            ))}
        </div>
    )
}

const BlogDetailsSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Skeleton className="w-full h-[500px] xl:h-[700px] rounded-lg" />
            <div className="flex gap-4">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
            </div>
            <Skeleton className="h-10 w-3/4 rounded" />
            <div className="space-y-4 mt-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className={`h-4 rounded ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-[95%]' : 'w-[90%]'}`} />
                ))}
            </div>
        </div>
    )
}

const skeletonMap: Record<MorphSkeletonVariant, React.FC<{ rows: number }>> = {
    categoryTable: CategoryTableSkeleton,
    productTable: ProductTableSkeleton,
    shopGrid: ShopGridSkeleton,
    productDetails: ProductDetailsSkeleton as any,
    blogGrid: BlogGridSkeleton,
    blogDetails: BlogDetailsSkeleton as any,
}

const MorphSkeleton = ({ variant, rows = 4 }: MorphSkeletonProps) => {
    const Component = skeletonMap[variant]
    return <Component rows={rows} />
}

export default MorphSkeleton
