import { CategorySchemaType } from "../schema/categorySchema";

export type TabProps = {
    selected: string;
    setSelected: (selected: string) => void;
    categories: string[]
}
export interface CategoryFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: CategorySchemaType) => void
    initialData?: CategorySchemaType & { id?: number }
    title: string
    description: string
}

export type DeleteCategoryDialogProps  = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    categoryName: string
}


export type Category = CategorySchemaType & {
    _id: number;
    items: number;
};
