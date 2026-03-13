"use client"

import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ProductFormSheet } from './ProductFormSheet'
import { ProductSchemaType } from '../schema/productSchema'
import { useGetAdminProducts } from '../services/product.client'
import { useDebounce } from '@/features/search/hooks/Debounce'
import { toast } from 'sonner'
import { errorHandler } from '@/lib/http/errorHandler'
import { adminProductServices } from '../services/product.service'
import { AdminProduct } from '../types/product.types'

export const AdminProductList = () => {
    
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    
    const { data: products, isLoading, isError } = useGetAdminProducts()

    console.log(products)


    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<AdminProduct | null>(null)

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800'
            case 'Low Stock': return 'bg-yellow-100 text-yellow-800'
            case 'Out of Stock': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const handleAdd = async (data: ProductSchemaType) => {
        try {
            await adminProductServices.add(data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
        setIsAddModalOpen(false);
    }

    const handleEdit = async (data: ProductSchemaType) => {
        if (!currentProduct?._id) return
        try {
            await adminProductServices.edit(currentProduct._id, data)
        } catch (error) {
            toast.error(errorHandler(error))
        }
        setIsEditModalOpen(false);
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

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 p-4 flex justify-between items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Product</th>
                                <th scope="col" className="px-6 py-4 font-medium">Category</th>
                                <th scope="col" className="px-6 py-4 font-medium">Price</th>
                                <th scope="col" className="px-6 py-4 font-medium">Stock</th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products?.products?.map((product) => (
                                <tr key={product.name} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{product.category.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            {product.isDiscount ? (
                                                <>
                                                    <span className="font-medium text-gray-900">${product.discountPrice?.toFixed(2)}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-400 line-through">${product.price.toFixed(2)}</span>
                                                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 rounded">-{product.discountPercentage}%</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{product?.stock || 0}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(product?.status || "")}`}>
                                            {product?.status || ""}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end gap-3 items-center mt-2">
                                        <button onClick={() => {
                                            setCurrentProduct(product)
                                            setIsEditModalOpen(true)
                                        }} className="text-gray-400 hover:text-primary transition-colors">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            <ProductFormSheet
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onSubmit={handleAdd}
                title="Add New Product"
                description="Create a new product for your catalog by filling out the details below."
            />

            {/* Edit Modal */}
            <ProductFormSheet
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                onSubmit={handleEdit}
                initialData={currentProduct || undefined}
                title="Edit Product"
                description="Update the details for this product."
            />
        </div>
    )
}
