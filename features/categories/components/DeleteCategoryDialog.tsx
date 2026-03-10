"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DeleteCategoryDialogProps } from "../types/categories.types"


export const DeleteCategoryDialog = ({
    open,
    onOpenChange,
    onConfirm,
    categoryName
}: DeleteCategoryDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-none">
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription className="text-sm">
                        Are you sure you want to delete <span className="font-semibold text-gray-900">{categoryName}</span>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Confirm Delete
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
