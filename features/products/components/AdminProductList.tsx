"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ProductFormSheet } from './ProductFormSheet'
import { ProductSchemaType } from '../schema/productSchema'
import { useGetAdminProducts } from '../services/product.client'
import { useDebounce } from '@/features/search/hooks/Debounce'
import { toast } from 'sonner'
import { errorHandler } from '@/lib/http/errorHandler'
import { AdminProduct } from '../types/product.types'
import { adminProductServices } from '../services/product.service'
import { AdminProductTable } from './AdminProductTable'
import { AdminProductSearch } from './AdminProductSearch'
import { AdminProductLimitSelect } from './AdminProductLimitSelect'
import { AdminProductPagination } from './AdminProductPagination'

export const AdminProductList = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    const { data: products, isLoading, isError, refetch } = useGetAdminProducts({
        search: debouncedSearchTerm,
        page,
        limit
    })

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<AdminProduct | null>(null)

    const handleAdd = async (data: ProductSchemaType) => {
        try {
            await adminProductServices.add(data)
            toast.success("Product added successfully")
            setIsAddModalOpen(false);
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    const handleEdit = async (data: ProductSchemaType) => {
        if (!currentProduct?._id) return
        try {
            await adminProductServices.edit(currentProduct._id, data)
            toast.success("Product updated successfully")
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(errorHandler(error))
        }
    }

    const handleLimitChange = (newLimit: string) => {
        setLimit(Number(newLimit))
        setPage(1) // Reset to first page when limit changes
    }

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setPage(1) // Reset to first page when search changes
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
                    <p className="text-gray-500 text-xs">Manage your product inventory and details.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                    <Plus className="mr-2 size-4" />
                    Add Product
                </button>
            </div>

            <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <AdminProductSearch
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <AdminProductLimitSelect
                        limit={limit}
                        onLimitChange={handleLimitChange}
                    />
                </div>

                <AdminProductTable
                    products={products}
                    isLoading={isLoading}
                    isError={isError}
                    refetch={refetch}
                    onEdit={(product: AdminProduct) => {
                        setCurrentProduct(product)
                        setIsEditModalOpen(true)
                    }}
                    onDelete={(product: AdminProduct) => {
                        // Handle delete
                        toast.error("Delete not implemented yet")
                    }}
                />

                <AdminProductPagination
                    currentPage={products?.pagination.currentPage || 1}
                    totalPages={products?.pagination.totalPages || 0}
                    onPageChange={setPage}
                />
            </div>

            {/* Add Modal */}
            <ProductFormSheet
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSubmit={handleAdd}
                refetch={refetch}
                title="Add New Product"
                description="Create a new product for your catalog by filling out the details below."
            />

            {/* Edit Modal */}
            <ProductFormSheet
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onSubmit={handleEdit}
                refetch={refetch}
                initialData={currentProduct ? {
                    ...currentProduct,
                    category: currentProduct.category._id
                } : undefined}
                title="Edit Product"
                description="Update the details for this product."
            />
        </div>
    )
}

