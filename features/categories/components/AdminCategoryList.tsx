"use client"

import { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Dummy Data
const INITIAL_CATEGORIES = [
    { id: 1, name: "Men's Clothing", description: "Shirts, pants, and accessories for men", items: 124, status: "Active" },
    { id: 2, name: "Women's Clothing", description: "Dresses, tops, and skirts for women", items: 256, status: "Active" },
    { id: 3, name: "Footwear", description: "Sneakers, boots, and sandals", items: 89, status: "Active" },
    { id: 4, name: "Accessories", description: "Watches, belts, and jewelry", items: 45, status: "Draft" },
]

export const AdminCategoryList = () => {
    const [categories, setCategories] = useState(INITIAL_CATEGORIES)
    const [searchTerm, setSearchTerm] = useState('')

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    // Form States
    const [currentCategory, setCurrentCategory] = useState<any>(null)
    const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' })

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAdd = () => {
        const newCategory = {
            id: categories.length + 1,
            ...formData,
            items: 0
        }
        setCategories([...categories, newCategory])
        setIsAddModalOpen(false)
        setFormData({ name: '', description: '', status: 'Active' })
    }

    const openEdit = (category: any) => {
        setCurrentCategory(category)
        setFormData({ name: category.name, description: category.description, status: category.status })
        setIsEditModalOpen(true)
    }

    const handleEdit = () => {
        setCategories(categories.map(c => c.id === currentCategory.id ? { ...c, ...formData } : c))
        setIsEditModalOpen(false)
    }

    const openDelete = (category: any) => {
        setCurrentCategory(category)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        setCategories(categories.filter(c => c.id !== currentCategory.id))
        setIsDeleteModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Categories</h1>
                    <p className="text-gray-500">Manage your store product categories here.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </button>
            </div>

            <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="border-b border-gray-200 p-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search categories..."
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
                                <th scope="col" className="px-6 py-4 font-medium">Name</th>
                                <th scope="col" className="px-6 py-4 font-medium">Description</th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">Items</th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 w-1/3 truncate">{category.description}</td>
                                    <td className="px-6 py-4 text-center">{category.items}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end gap-3">
                                        <button
                                            onClick={() => openEdit(category)}
                                            className="text-gray-400 hover:text-primary transition-colors"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => openDelete(category)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
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
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>Create a new category for your products.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Summer Collection"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Input
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Short description..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAdd}
                            className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Save Category
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>Update the details for this category.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Input
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEdit}
                            className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Save Changes
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <span className="font-semibold text-gray-900">{currentCategory?.name}</span>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Confirm Delete
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
