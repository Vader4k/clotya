"use client";

import Link from "next/link";
import { Plus, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AdminBlogTable from "./AdminBlogTable";
import AdminBlogSkeleton from "./AdminBlogSkeleton";
import { useGetAllBlogs } from "../hooks/blog.hooks";
import { blogService } from "../services/blog.service";
import { errorHandler } from "@/lib/http/errorHandler";

const AdminBlogList = () => {
  const { data, isLoading, isError, refetch } = useGetAllBlogs({ page: 1, limit: 10 });

  const isEmpty = !data?.blogs || data.blogs.length === 0;

  const handleDelete = async (id: string) => {
    try {
      const res = await blogService.delete(id);
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error(errorHandler(error));
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Blog Posts</h1>
          <p className="text-gray-500">Manage your website's blog content</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="overflow-x-auto">
            <AdminBlogSkeleton />
          </div>
        ) : isError ? (
          <div className="p-20 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 mb-2">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Failed to load blogs</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              There was an error fetching your blog posts. Please check your connection and try again.
            </p>
            <button 
              onClick={() => refetch()} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : isEmpty ? (
          <div className="p-12 text-center text-gray-500">
            No blog posts found. Create your first post!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <AdminBlogTable blogs={data?.blogs || []} onDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogList;
