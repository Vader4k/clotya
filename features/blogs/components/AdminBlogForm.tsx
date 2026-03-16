"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, BlogSchemaType } from "../schema/blog.schema";
import TiptapEditor from "./TiptapEditor";
import { useEffect, useState } from "react";
import { blogService } from "../services/blog.service";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminBlogFormProps {
  initialData?: Partial<BlogSchemaType>;
  isEditing?: boolean;
  handleData: (data: BlogSchemaType) => void;
}

const AdminBlogForm = ({ initialData, isEditing = false, handleData }: AdminBlogFormProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      categories: initialData?.categories || [],
      tags: initialData?.tags || [],
      image: initialData?.image || "",
      intro: initialData?.intro || "",
      details: initialData?.details || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        categories: initialData?.categories || [],
        tags: initialData?.tags || [],
        image: initialData?.image || "",
        intro: initialData?.intro || "",
        details: initialData?.details || "",
      });
    }
  }, [initialData, reset]);

  const title = watch("title");

  useEffect(() => {
    if (!isEditing && title) {
      const slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", slug);
    }
  }, [title, setValue, isEditing]);

  useEffect(() => {
    const fetchData = async () => {
      const [cats, tgs] = await Promise.all([
        blogService.getCategories(),
        blogService.getTags(),
      ]);
      setCategories(cats);
      setTags(tgs);
    };
    fetchData();
  }, []);

  const onSubmit = async (data: BlogSchemaType) => {
    await handleData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8 bg-white border border-gray-200 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Blog Title</label>
          <Input
            {...register("title")}
            placeholder="Enter a catchy blog title"
            className={errors.title ? "border-red-500 ring-red-500/20" : "" + "rounded-none"}
          />
          {errors.title && <p className="text-xs font-medium text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Slug</label>
          <Input
            {...register("slug")}
            disabled
            placeholder="blog-post-slug"
            className={errors.slug ? "border-red-500 ring-red-500/20" : "" + "rounded-none"}
          />
          {errors.slug && <p className="text-xs font-medium text-red-500">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Categories</label>
          <div className={`p-1 border mt-1 bg-white ${errors.categories ? "border-red-500" : "border-gray-200"}`}>
            <ScrollArea className="h-40 px-3 py-2">
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Controller
                      name="categories"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`cat-${cat}`}
                          checked={field.value.includes(cat)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, cat]
                              : field.value.filter((v: string) => v !== cat);
                            field.onChange(newValue);
                          }}
                        />
                      )}
                    />
                    <label
                      htmlFor={`cat-${cat}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          {errors.categories && <p className="text-xs font-medium text-red-500">{errors.categories.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-900">Tags</label>
          <div className={`p-1 border mt-1 bg-white ${errors.tags ? "border-red-500" : "border-gray-200"}`}>
            <ScrollArea className="h-40 px-3 py-2">
              <div className="space-y-3">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={field.value.includes(tag)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, tag]
                              : field.value.filter((v: string) => v !== tag);
                            field.onChange(newValue);
                          }}
                        />
                      )}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          {errors.tags && <p className="text-xs font-medium text-red-500">{errors.tags.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900">Cover Image URL</label>
        <Input
          {...register("image")}
          placeholder="https://images.unsplash.com/..."
          className={errors.image ? "border-red-500 ring-red-500/20" : "" + "rounded-none mt-1"}
        />
        {errors.image && <p className="text-xs font-medium text-red-500">{errors.image.message}</p>}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900">Intro / Summary</label>
        <Textarea
          {...register("intro")}
          placeholder="Give a brief overview of what this post is about..."
          className={`min-h-[100px] resize-none ${errors.intro ? "border-red-500 ring-red-500/20" : "" + "rounded-none mt-1"}`}
        />
        {errors.intro && <p className="text-xs font-medium text-red-500">{errors.intro.message}</p>}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900">Content (Markdown Editor)</label>
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <TiptapEditor
              content={field.value}
              onChange={field.onChange}
              placeholder="Start writing your amazing blog story..."
            />
          )}
        />
        {errors.details && <p className="text-xs text-red-500">{errors.details.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-2.5 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          {isSubmitting ? "Processing..." : isEditing ? "Save Changes" : "Publish Post"}
        </button>
      </div>
    </form>
  );
};

export default AdminBlogForm;
