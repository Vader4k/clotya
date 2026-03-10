"use client"

import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

// Dummy Data
const INITIAL_PRODUCTS = [
    { id: 1, name: "Classic White T-Shirt", category: "Men's Clothing", price: 29.99, stock: 154, status: "Active" },
    { id: 2, name: "Summer Floral Dress", category: "Women's Clothing", price: 59.99, stock: 45, status: "Active" },
    { id: 3, name: "Running Sneakers Elite", category: "Footwear", price: 129.99, stock: 12, status: "Low Stock" },
    { id: 4, name: "Leather Crossbody Bag", category: "Accessories", price: 89.99, stock: 0, status: "Out of Stock" },
    { id: 5, name: "Denim Jacket Vintage", category: "Men's Clothing", price: 79.99, stock: 34, status: "Active" },
]

export const AdminProductList = () => {
    const [products, setProducts] = useState(INITIAL_PRODUCTS)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800'
            case 'Low Stock': return 'bg-yellow-100 text-yellow-800'
            case 'Out of Stock': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
                    <p className="text-gray-500">Manage your product inventory and details.</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                    <Plus className="mr-2 h-4 w-4" />
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
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end gap-3 items-center mt-2">
                                        <button className="text-gray-400 hover:text-primary transition-colors">
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
        </div>
    )
}
