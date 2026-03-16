"use client";

import AdminBlogForm from "@/features/blogs/components/AdminBlogForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useGetBlogById, useUpdateBlog } from "@/features/blogs/hooks/blog.hooks";
import { use } from "react";
import { BlogSchemaType } from "@/features/blogs/schema/blog.schema";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

const EditBlogPage = ({ params }: EditBlogPageProps) => {
  const { id } = use(params);
  const { data: blog, isLoading, isError } = useGetBlogById(id);
  const updateMutation = useUpdateBlog(id);

  const handleUpdate = async (data: BlogSchemaType) => {
    await updateMutation.mutateAsync(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-semibold text-gray-900">Post not found</h2>
        <p className="text-gray-500 mt-1">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/admin/blogs" 
          className="mt-4 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
        >
          <ChevronLeft size={16} />
          Back to list
        </Link>
      </div>
    );
  }

  // Pre-mapping data to match schema
  const initialData: Partial<BlogSchemaType> = {
    title: blog.title,
    slug: blog.slug,
    categories: blog.categories,
    tags: blog.tags,
    image: blog.image,
    intro: blog.intro,
    details: blog.details || "",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/blogs" className="p-1 hover:bg-gray-100 rounded-lg border transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Edit Post</h1>
      </div>
      
      <AdminBlogForm 
        initialData={initialData} 
        isEditing 
        handleData={handleUpdate} 
      />
    </div>
  );
};

export default EditBlogPage;
