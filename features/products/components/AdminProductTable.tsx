"use client"

import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react'
import { AdminProduct, AdminProductTableProps } from '../types/product.types'
import { calculateTotalStock, getProductStatus, getStatusStyles } from '../utils/product.utils'
import MorphSkeleton from '@/shared/ui/MorphSkeleton'
import AdminProductErrorState from './AdminProductErrorState'
import Image from 'next/image'

export const AdminProductTable = ({
    products,
    isLoading,
    isError,
    refetch,
    onEdit,
    onDelete
}: AdminProductTableProps) => {

    if (isLoading) {
        return <MorphSkeleton variant="productTable" rows={5} />
    }

    if (isError) {
        return <AdminProductErrorState refetch={refetch} />
    }

    return (
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
                    {products?.products?.map((product: AdminProduct) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                                        {product.images && product.images.length > 0 ? (
                                            <Image src={product.images[0]} alt={product.name} width={40} height={40} className="object-cover" />
                                        ) : (
                                            <ImageIcon className="size-4 text-gray-400" />
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-900">{product.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {product.category.map((cat, idx) => (
                                        <span key={cat._id} className="inline-block">
                                            {cat.name}{idx < product.category.length - 1 ? ',' : ''}
                                        </span>
                                    ))}
                                </div>
                            </td>
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
                            <td className="px-6 py-4">{calculateTotalStock(product.inventory || [])}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(getProductStatus({ ...product, inventory: product.inventory || [] }))}`}>
                                    {getProductStatus({ ...product, inventory: product.inventory || [] })}
                                </span>
                            </td>
                            <td className="px-6 py-4 flex justify-end gap-3 items-center mt-2">
                                <button onClick={() => onEdit(product)} className="text-gray-400 hover:text-primary transition-colors">
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button onClick={() => onDelete(product)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {products?.products.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-gray-400 italic">
                                No products found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
