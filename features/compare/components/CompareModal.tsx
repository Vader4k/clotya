"use client"

import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CompareModalProps } from "../types/compare.types"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CompareModal = ({ isOpen, onClose, productName, isDuplicate }: CompareModalProps) => {
    const router = useRouter()

    const handleViewCompare = () => {
        onClose()
        router.push("/compare")
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent showCloseButton={false} className="max-w-sm! font-jost rounded-none" aria-describedby={undefined}>
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Compare Modal</DialogTitle>
                        <DialogDescription>
                            Compare Modal
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                <p className="text-center text-sm leading-snug">
                    <span className="font-semibold capitalize">{productName}</span>
                    <br />
                    <span className={isDuplicate ? "text-red-500" : "text-green-500"}>
                        {isDuplicate
                            ? "is already in the Compare list."
                            : "has been added to Compare list."}
                    </span>
                </p>

                <div className="mt-2 grid gap-3">
                    <button
                        onClick={handleViewCompare}
                        className="w-full rounded border border-gray-300 py-2 text-sm transition-colors hover:bg-neutral-600 hover:text-white"
                    >
                        View Compare Page
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full rounded border border-gray-300 py-2 text-sm transition-colors hover:bg-neutral-600 hover:text-white"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CompareModal
