import { Plus, Tags } from 'lucide-react'
import React from 'react'

const AdminEmptyState = ({ setIsAddModalOpen }: {
    setIsAddModalOpen: (open: boolean) => void
}) => {
    return (
        <div className="border border-gray-200 bg-white rounded-lg p-12 flex flex-col items-center justify-center text-center gap-3">
            <div className="rounded-full bg-gray-100 p-4">
                <Tags className="size-8 text-gray-400" />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-gray-900">No categories yet</h3>
                <p className="text-xs text-gray-500 mt-1">Get started by adding your first product category.</p>
            </div>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors mt-1"
            >
                <Plus className="size-4" />
                Add Category
            </button>
        </div>
    )
}

export default AdminEmptyState