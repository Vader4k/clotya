import { AlertCircle, RefreshCw } from 'lucide-react'

const AdminProductErrorState = ({ refetch }: { refetch: () => void }) => {
    return (
        <div className="border border-red-200 bg-red-50 rounded-lg p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="size-6 text-red-500" />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-red-800">Failed to load products</h3>
                <p className="text-xs text-red-600 mt-1">Something went wrong while fetching your products.</p>
            </div>
            <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors mt-1"
            >
                <RefreshCw className="size-4" />
                Retry
            </button>
        </div>
    )
}

export default AdminProductErrorState
