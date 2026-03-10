import { Skeleton } from "@/components/ui/skeleton"

type MorphSkeletonVariant = "categoryTable"

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

const skeletonMap: Record<MorphSkeletonVariant, React.FC<{ rows: number }>> = {
    categoryTable: CategoryTableSkeleton,
}

const MorphSkeleton = ({ variant, rows = 4 }: MorphSkeletonProps) => {
    const Component = skeletonMap[variant]
    return <Component rows={rows} />
}

export default MorphSkeleton
