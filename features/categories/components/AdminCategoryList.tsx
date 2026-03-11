"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CategoryFormDialog } from './CategoryFormDialog'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'
import { CategorySchemaType } from '../schema/categorySchema'
import CategorySearch from './CategorySearch'
import CategoryTable from './CategoryTable'
import { Category } from '../types/categories.types'
import { useCategories } from '../hooks/useCategories'
import MorphSkeleton from '@/shared/ui/MorphSkeleton'
import AdminErrorState from './AdminErrorState'
import AdminEmptyState from './AdminEmptyState'
import { categoriesService } from '../services/categories.service'
import { errorHandler } from '@/lib/http/errorHandler'
import { toast } from 'sonner'

export const AdminCategoryList = () => {

    const { data, isPending, isError, refetch } = useCategories()

    const [searchTerm, setSearchTerm] = useState('')

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    // Current Selection
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

    const filteredCategories = data?.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []

    const handleAdd = async (data: CategorySchemaType) => {
        try {
            await categoriesService.addNewCategory(data)
            refetch()
            setIsAddModalOpen(false)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    const handleEdit = async (data: CategorySchemaType) => {
        if (!currentCategory?._id) return
        try {
            await categoriesService.editCategory({ data, id: String(currentCategory._id) })
            refetch()
            setIsEditModalOpen(false)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    const handleDelete = async () => {
        if (!currentCategory?._id) return
        try {
            await categoriesService.deleteCategory(String(currentCategory._id))
            refetch()
            setIsDeleteModalOpen(false)
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Categories</h1>
                    <p className="text-gray-500 text-xs">Manage your store product categories here.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                    <Plus className="mr-2 size-4" />
                    Add Category
                </button>
            </div>

            {/* Loading State */}
            {isPending && (
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <MorphSkeleton variant="categoryTable" rows={4} />
                </div>
            )}

            {/* Error State */}
            {isError && (
                <AdminErrorState refetch={refetch} />
            )}

            {/* Empty State */}
            {!isPending && !isError && data && data.length === 0 && (
                <AdminEmptyState setIsAddModalOpen={setIsAddModalOpen} />
            )}

            {/* Data State */}
            {!isPending && !isError && data && data.length > 0 && (
                <div className="border border-gray-200 bg-white overflow-hidden">
                    <CategorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    <CategoryTable
                        categories={filteredCategories}
                        onEdit={(category) => {
                            setCurrentCategory(category)
                            setIsEditModalOpen(true)
                        }}
                        onDelete={(category) => {
                            setCurrentCategory(category)
                            setIsDeleteModalOpen(true)
                        }}
                    />
                </div>
            )}

            {/* Add Modal */}
            <CategoryFormDialog
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSubmit={handleAdd}
                title="Add New Category"
                description="Create a new category for your products."
            />

            {/* Edit Modal */}
            <CategoryFormDialog
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                initialData={currentCategory || undefined}
                onSubmit={handleEdit}
                title="Edit Category"
                description="Update the details for this category."
            />

            {/* Delete Modal */}
            <DeleteCategoryDialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                categoryName={currentCategory?.name || ''}
            />
        </div>
    )
}
