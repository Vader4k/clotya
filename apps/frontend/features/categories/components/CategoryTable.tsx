import { Edit2, Trash2 } from 'lucide-react'
import { Category } from '../types/categories.types'

interface CategoryTableProps {
    categories: Category[]
    onEdit: (category: Category) => void
    onDelete: (category: Category) => void
}

const CategoryTable = ({ categories, onEdit, onDelete }: CategoryTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium">Name</th>
                        <th scope="col" className="px-6 py-4 font-medium">Slug</th>
                        <th scope="col" className="px-6 py-4 font-medium hidden md:table-cell">Description</th>
                        <th scope="col" className="px-6 py-4 font-medium text-center">Items</th>
                        <th scope="col" className="px-6 py-4 font-medium text-center">Status</th>
                        <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {categories.map((category) => (
                        <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                            <td className="px-6 py-4 font-mono text-xs">{category.slug}</td>
                            <td className="px-6 py-4 w-1/4 truncate hidden md:table-cell max-w-sm">{category.description}</td>
                            <td className="px-6 py-4 text-center">{category.items}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {category.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="px-6 py-4 flex justify-end gap-3 text-right">
                                <button
                                    onClick={() => onEdit(category)}
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    <Edit2 className="size-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(category)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryTable
