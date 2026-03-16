import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { blogService } from "../services/blog.service"
import { QUERIES } from "@/queries/queries"
import { BlogSchemaType } from "../schema/blog.schema"
import { toast } from "sonner"
import { errorHandler } from "@/lib/http/errorHandler"
import { useRouter } from "next/navigation"

export const useGetAllBlogs = ({ page, limit }: { page: number, limit: number }) => {
    return useQuery({
        queryKey: [QUERIES.admin.blogs.GETALL_N_ADD, page, limit],
        queryFn: () => blogService.getAll({ page, limit }),
    })
}

export const useGetBlogById = (id: string) => {
    return useQuery({
        queryKey: [QUERIES.admin.blogs.GET_N_EDIT_N_DEL, id],
        queryFn: () => blogService.getById(id),
        enabled: !!id,
    })
}

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: (data: BlogSchemaType) => blogService.create(data),
        onSuccess: (res) => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: [QUERIES.admin.blogs.GETALL_N_ADD],
            });
            router.push("/admin/blogs");
        },
        onError: (error) => {
            toast.error(errorHandler(error));
        },
    })
}

export const useUpdateBlog = (id: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: (data: BlogSchemaType) => blogService.update(id, data),
        onSuccess: (res) => {
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: [QUERIES.admin.blogs.GETALL_N_ADD],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERIES.admin.blogs.GET_N_EDIT_N_DEL, id],
            });
            router.push("/admin/blogs");
        },
        onError: (error) => {
            toast.error(errorHandler(error));
        },
    })
}