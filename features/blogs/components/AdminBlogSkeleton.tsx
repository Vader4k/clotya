import { Skeleton } from "@/components/ui/skeleton";

const AdminBlogSkeleton = () => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Post</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Categories</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
          <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-b border-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-14 rounded" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-1">
                <Skeleton className="h-4 w-12 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-full" />
              </div>
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-4 w-20" />
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminBlogSkeleton;
