import Image from 'next/image'
import Link from 'next/link'
import { Edit, Trash2, ExternalLink } from 'lucide-react'
import { BlogCardProps } from '../types/blog.types'

const AdminBlogTable = ({ blogs, onDelete }: { blogs: BlogCardProps[], onDelete: (id: string) => void }) => {
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
                {blogs.map((blog) => (
                    <tr key={blog.slug} className="hover:bg-gray-50 border-b border-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-14 aspect-video overflow-hidden shrink-0 border border-gray-100">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col max-w-xs md:max-w-md">
                                    <span className="font-medium text-gray-900 truncate">{blog.title}</span>
                                    <span className="text-xs text-gray-500 truncate">{blog.slug}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                                {blog.categories.map((cat) => (
                                    <span key={cat} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full uppercase">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    target="_blank"
                                    className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                                    title="View Public Post"
                                >
                                    <ExternalLink size={18} />
                                </Link>
                                <Link
                                    href={`/admin/blogs/edit/${blog._id}`}
                                    className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"
                                    title="Edit Post"
                                >
                                    <Edit size={18} />
                                </Link>
                                <button
                                    onClick={() => onDelete(blog._id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete Post"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AdminBlogTable