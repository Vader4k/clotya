"use client"

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, CategorySchemaType } from '../schema/categorySchema'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { CategoryFormDialogProps } from '../types/categories.types'
import { Loader, X, Plus } from 'lucide-react'


export const CategoryFormDialog = ({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    title,
    description
}: CategoryFormDialogProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<CategorySchemaType>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            isActive: true,
            tags: []
        }
    })

    const [tagInput, setTagInput] = useState('')
    const tags = watch('tags') || []
    const nameValue = watch('name')

    const addTag = () => {
        const trimmed = tagInput.trim().toLowerCase()
        if (trimmed && !tags.includes(trimmed)) {
            setValue('tags', [...tags, trimmed], { shouldValidate: true })
        }
        setTagInput('')
    }

    const removeTag = (tagToRemove: string) => {
        setValue('tags', tags.filter((t) => t !== tagToRemove), { shouldValidate: true })
    }

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    // Auto-generate slug from name
    useEffect(() => {
        if (!initialData && nameValue) {
            const slug = nameValue
                .toLowerCase()
                .replace(/[^a-z0-0]+/g, '-')
                .replace(/^-+|-+$/g, '')
            setValue('slug', slug, { shouldValidate: true })
        }
    }, [nameValue, setValue, initialData])

    useEffect(() => {
        if (open) {
            setTagInput('')
            if (initialData) {
                reset({
                    name: initialData.name,
                    slug: initialData.slug,
                    description: initialData.description || '',
                    isActive: initialData.isActive,
                    tags: initialData.tags || [],
                })
            } else {
                reset({
                    name: '',
                    slug: '',
                    description: '',
                    isActive: true,
                    tags: [],
                })
            }
        }
    }, [open, initialData, reset])

    const handleFormSubmit = (data: CategorySchemaType) => {
        onSubmit(data)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-none">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                            {...register('name')}
                            placeholder="e.g. Summer Collection"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input
                            {...register('slug')}
                            placeholder="summer-collection"
                            className={errors.slug ? 'border-red-500' : ''}
                        />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            {...register('description')}
                            placeholder="Short description..."
                            className={errors.description ? 'border-red-500' : ''}
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tags</label>
                        <div className="flex gap-2">
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Add a tag..."
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                disabled={!tagInput.trim()}
                                className="px-3 py-2 border rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        {errors.tags && <p className="text-xs text-red-500">{errors.tags.message}</p>}
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">Active Status</label>
                            <p className="text-xs text-gray-500">Enable or disable this category</p>
                        </div>
                        <Switch
                            checked={watch('isActive')}
                            onCheckedChange={(checked) => setValue('isActive', checked)}
                        />
                    </div>
                    <DialogFooter className="mt-6">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader className='animate-spin'/> : initialData ? 'Update Category' : 'Create Category'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
