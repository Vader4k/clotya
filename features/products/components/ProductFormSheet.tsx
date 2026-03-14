"use client"

import { useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductSchemaType } from '../schema/productSchema'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Loader, Plus, Trash2, X } from 'lucide-react'
import { useCategories } from "@/features/categories/hooks/useCategories"
import { ProductFormSheetProps } from '../types/product.types'
import { ImageUploader } from './ImageUploader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


export const ProductFormSheet = ({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    title,
    description,
    refetch
}: ProductFormSheetProps) => {
    const { data: categories } = useCategories();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        control,
        formState: { errors, isSubmitting }
    } = useForm<ProductSchemaType>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            slug: '',
            sku: '',
            description: '',
            shortDescription: '',
            price: 0,
            images: [],
            isBestSeller: false,
            isFeatured: false,
            isNewArrival: false,
            isTrending: false,
            isDiscount: false,
            inventory: [],
            colors: [],
            category: [],
            tags: [],
        }
    })

    const nameValue = watch('name')
    const selectedCategoryIds = watch('category') || []
    const isDiscount = watch('isDiscount')
    const price = watch('price')
    const discountPrice = watch('discountPrice')

    useEffect(() => {
        if (isDiscount && price > 0 && discountPrice !== undefined && discountPrice >= 0) {
            if (discountPrice < price) {
                const percentage = Math.round(((price - discountPrice) / price) * 100)
                setValue('discountPercentage', percentage, { shouldValidate: true })
            } else {
                setValue('discountPercentage', 0, { shouldValidate: true })
            }
        } else if (!isDiscount) {
            setValue('discountPrice', undefined, { shouldValidate: true })
            setValue('discountPercentage', undefined, { shouldValidate: true })
        }
    }, [isDiscount, price, discountPrice, setValue])
    const selectedCategories = categories?.filter(c => selectedCategoryIds.includes(String(c._id))) || []
    const availableTags = selectedCategories.flatMap(c => (c.tags as { name: string, _id: string | number }[]) || [])

    const currentTags = watch('tags')

    // Field arrays for complex objects
    const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({ control, name: 'colors' })
    const { fields: invFields, append: appendInv, remove: removeInv } = useFieldArray({ control, name: 'inventory' })

    // Auto-generate slug from name
    useEffect(() => {
        if (!initialData && nameValue) {
            const slug = nameValue
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            setValue('slug', slug, { shouldValidate: true })
        }
    }, [nameValue, setValue, initialData])

    // Maintain tags when categories change (filter out tags that no longer belong to any selected category)
    useEffect(() => {
        if (!initialData) {
            const availableTagIds = availableTags.map(t => String(t._id))
            const validTags = currentTags.filter(t => availableTagIds.includes(t))
            if (validTags.length !== currentTags.length) {
                setValue('tags', validTags)
            }
        }
    }, [selectedCategoryIds, availableTags, setValue, initialData, currentTags])

    useEffect(() => {
        if (open) {
            if (initialData) {
                reset({
                    name: initialData.name || '',
                    slug: initialData.slug || '',
                    sku: initialData.sku || '',
                    description: initialData.description || '',
                    shortDescription: initialData.shortDescription || '',
                    price: initialData.price || 0,
                    discountPrice: initialData.discountPrice,
                    discountPercentage: initialData.discountPercentage,
                    images: initialData.images || [],
                    isBestSeller: initialData.isBestSeller ?? false,
                    isFeatured: initialData.isFeatured ?? false,
                    isNewArrival: initialData.isNewArrival ?? false,
                    isTrending: initialData.isTrending ?? false,
                    isDiscount: initialData.isDiscount ?? false,
                    inventory: initialData.inventory || [],
                    colors: initialData.colors || [],
                    category: initialData.category instanceof Array ? initialData.category : [],
                    tags: initialData.tags || [],
                })
            } else {
                reset({
                    name: '',
                    slug: '',
                    sku: '',
                    description: '',
                    shortDescription: '',
                    price: 0,
                    images: [],
                    isBestSeller: false,
                    isFeatured: false,
                    isNewArrival: false,
                    isTrending: false,
                    isDiscount: false,
                    inventory: [],
                    colors: [],
                    category: [],
                    tags: [],
                })
            }
        }
    }, [open, initialData, reset])

    const handleFormSubmit = async (data: ProductSchemaType) => {
        await onSubmit(data)
        reset()
        refetch()
    }

    const toggleTag = (tagId: string) => {
        if (currentTags.includes(tagId)) {
            setValue('tags', currentTags.filter(t => t !== tagId), { shouldValidate: true })
        } else {
            setValue('tags', [...currentTags, tagId], { shouldValidate: true })
        }
    }

    const toggleCategory = (categoryId: string) => {
        if (selectedCategoryIds.includes(categoryId)) {
            setValue('category', selectedCategoryIds.filter(id => id !== categoryId), { shouldValidate: true })
        } else {
            setValue('category', [...selectedCategoryIds, categoryId], { shouldValidate: true })
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 px-4">

                    {/* Images */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Images</h3>
                        <Controller
                            control={control}
                            name="images"
                            render={({ field }) => (
                                <ImageUploader
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.images && <p className="text-xs text-red-500">{errors.images.message}</p>}
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Name</label>
                                <Input {...register('name')} placeholder="Product name" className={errors.name ? 'border-red-500' : '' + "rounded-none"} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Slug</label>
                                <Input {...register('slug')} placeholder="product-slug" className={errors.slug ? 'border-red-500' : '' + "rounded-none"} />
                                {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium">SKU</label>
                                <Input {...register('sku')} placeholder="SKU-123" className={errors.sku ? 'border-red-500 rounded-none' : 'rounded-none'} />
                                {errors.sku && <p className="text-xs text-red-500">{errors.sku.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Price</label>
                                <Input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className={errors.price ? 'border-red-500 rounded-none' : 'rounded-none'} />
                                {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                            </div>
                        </div>

                        {isDiscount && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium">Discount Price</label>
                                    <Input type="number" step="0.01" {...register('discountPrice', { valueAsNumber: true })} className={errors.discountPrice ? 'border-red-500 rounded-none' : 'rounded-none'} />
                                    {errors.discountPrice && <p className="text-xs text-red-500">{errors.discountPrice.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium">Discount Percentage (%)</label>
                                    <Input type="number" {...register('discountPercentage', { valueAsNumber: true })} disabled className="bg-gray-100 rounded-none cursor-not-allowed" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Descriptions</h3>
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Short Description</label>
                            <Input {...register('shortDescription')} placeholder="Brief overview" className={errors.shortDescription ? 'border-red-500' : '' + "rounded-none"} />
                            {errors.shortDescription && <p className="text-xs text-red-500">{errors.shortDescription.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor='full description' className="text-xs font-medium">Full Description</label>
                            <textarea id='full description' autoComplete='on' rows={5} {...register('description')} placeholder="Detailed description" className={errors.description ? 'border-red-500' : '' + "rounded-none w-full border border-gray-300 p-3 text-sm"} />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Categories & Tags</h3>
                        <div className="space-y-2">
                            <label className="text-xs font-medium">Categories</label>
                            
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedCategories.map(cat => (
                                    <div key={cat._id} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs border border-primary/20">
                                        <span>{cat.name}</span>
                                        <button type="button" onClick={() => toggleCategory(String(cat._id))} className="hover:text-destructive">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {selectedCategoryIds.length === 0 && (
                                    <p className="text-xs text-gray-500 italic">No categories selected.</p>
                                )}
                            </div>

                            <Select onValueChange={(val) => {
                                if (val) toggleCategory(val);
                            }} value="">
                                <SelectTrigger className={errors.category ? 'border-red-500' : '' + "text-xs ring-1 ring-gray-300! mt-1 notranslate rounded-none"}>
                                    <SelectValue translate="no" className="notranslate" placeholder="Add a category..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map(c => {
                                        const isSelected = selectedCategoryIds.includes(String(c._id));
                                        return (
                                            <SelectItem className="notranslate" translate="no" key={c._id} value={String(c._id)}>
                                                <div className="flex items-center justify-between w-full pr-4">
                                                    <span>{c.name}</span>
                                                    {isSelected && <span className="text-xs text-muted-foreground ml-2">(Selected)</span>}
                                                </div>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium">Tags (from selected categories)</label>
                            <div className="mb-2 flex flex-wrap gap-2">
                                {currentTags.map(tagId => {
                                    const tag = availableTags.find((t) => String(t._id) === tagId)
                                    if (!tag) return null;
                                    return (
                                        <div key={tagId} className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md text-xs">
                                            <span>{tag.name}</span>
                                            <button type="button" onClick={() => toggleTag(tagId)} className="hover:text-primary-foreground/80">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            <Select onValueChange={(val) => {
                                if (val) toggleTag(val);
                            }} disabled={selectedCategoryIds.length === 0} value="">
                                <SelectTrigger className='ring-1 rounded-none ring-gray-300 text-xs notranslate'>
                                    <SelectValue translate="no" className="notranslate" placeholder={selectedCategoryIds.length === 0 ? "Select a category first" : "Select a tag to add/remove..."} />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableTags.map((tag) => {
                                        const isSelected = currentTags.includes(String(tag._id));
                                        return (
                                            <SelectItem className="notranslate"
                                                translate="no" key={tag._id} value={String(tag._id)}>
                                                <div className="flex items-center justify-between w-full pr-4">
                                                    <span>{tag.name}</span>
                                                    {isSelected && <span className="text-xs text-muted-foreground ml-2">(Selected)</span>}
                                                </div>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Variants</h3>

                        {/* Colors */}
                        <div className="space-y-2 p-4 border">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-medium">Colors</label>
                                <button type="button" onClick={() => appendColor({ name: '', hex: '' })} className="text-xs flex items-center gap-1 text-primary hover:text-primary/80">
                                    <Plus className="w-3 h-3" /> Add Color
                                </button>
                            </div>
                            {colorFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start mt-2">
                                    <div className="flex-1 space-y-1">
                                        <Input {...register(`colors.${index}.name`)} placeholder="Color Name (e.g. Red)" className="h-8 text-sm rounded-none" />
                                        {errors.colors?.[index]?.name && <p className="text-[10px] text-red-500">{errors.colors[index]?.name?.message}</p>}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex gap-2">
                                            <Input {...register(`colors.${index}.hex`)} placeholder="Hex (e.g. #FF0000)" className="h-8 text-sm uppercase rounded-none" />
                                            <div className="w-8 h-8 rounded border shadow-sm" style={{ backgroundColor: watch(`colors.${index}.hex`) || '#FFF' }} />
                                        </div>
                                        {errors.colors?.[index]?.hex && <p className="text-[10px] text-red-500">{errors.colors[index]?.hex?.message}</p>}
                                    </div>
                                    <button type="button" onClick={() => removeColor(index)} className="p-2 text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Inventory Sizes */}
                        <div className="space-y-2 p-4 border">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-medium">Inventory Sizes</label>
                                <button type="button" onClick={() => appendInv({ size: '', quantity: 0 })} className="text-xs flex items-center gap-1 text-primary hover:text-primary/80">
                                    <Plus className="w-3 h-3" /> Add Size
                                </button>
                            </div>
                            {invFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start mt-2">
                                    <div className="flex-1 space-y-1">
                                        <Input {...register(`inventory.${index}.size`)} placeholder="Size (e.g. XL)" className="h-8 text-sm rounded-none uppercase" />
                                        {errors.inventory?.[index]?.size && <p className="text-[10px] text-red-500">{errors.inventory[index]?.size?.message}</p>}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Input type="number" {...register(`inventory.${index}.quantity`, { valueAsNumber: true })} placeholder="Qty" className="h-8 text-sm rounded-none" />
                                        {errors.inventory?.[index]?.quantity && <p className="text-[10px] text-red-500">{errors.inventory[index]?.quantity?.message}</p>}
                                    </div>
                                    <button type="button" onClick={() => removeInv(index)} className="p-2 text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status Flags */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Flags</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-between border p-3">
                                <div className="space-y-0.5"><label className="text-xs font-medium">Best Seller</label></div>
                                <Switch checked={watch('isBestSeller')} onCheckedChange={(checked) => setValue('isBestSeller', checked)} />
                            </div>
                            <div className="flex items-center justify-between border p-3">
                                <div className="space-y-0.5"><label className="text-xs font-medium">Featured</label></div>
                                <Switch checked={watch('isFeatured')} onCheckedChange={(checked) => setValue('isFeatured', checked)} />
                            </div>
                            <div className="flex items-center justify-between border p-3">
                                <div className="space-y-0.5"><label className="text-xs font-medium">New Arrival</label></div>
                                <Switch checked={watch('isNewArrival')} onCheckedChange={(checked) => setValue('isNewArrival', checked)} />
                            </div>
                            <div className="flex items-center justify-between border p-3">
                                <div className="space-y-0.5"><label className="text-xs font-medium">Trending</label></div>
                                <Switch checked={watch('isTrending')} onCheckedChange={(checked) => setValue('isTrending', checked)} />
                            </div>
                            <div className="flex items-center justify-between border p-3">
                                <div className="space-y-0.5"><label className="text-xs font-medium">Has Discount</label></div>
                                <Switch checked={watch('isDiscount')} onCheckedChange={(checked) => setValue('isDiscount', checked)} />
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="mt-8">
                        <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-4 py-2 text-sm font-medium flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 min-w-[120px]">
                            {isSubmitting ? <Loader className="animate-spin w-4 h-4" /> : initialData ? 'Update Product' : 'Create Product'}
                        </button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
