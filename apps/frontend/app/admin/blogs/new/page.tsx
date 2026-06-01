"use client"

import AdminBlogForm from "@/features/blogs/components/AdminBlogForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BlogSchemaType } from "@/features/blogs/schema/blog.schema";
import { useCreateBlog } from "@/features/blogs/hooks/blog.hooks";


const NewBlogPage = () => {
  const createBlog = useCreateBlog();

  const handleAdd = async (data: BlogSchemaType) => {
    await createBlog.mutateAsync(data);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/blogs" className="p-1 border border-gray-200 hover:bg-gray-100 rounded-md transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 tracking-tighter">Create New Post</h1>
      </div>

      <AdminBlogForm handleData={handleAdd} />
    </div>
  );
};

export default NewBlogPage;
