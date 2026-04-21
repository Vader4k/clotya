"use client"
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import MiniCart from "./MiniCart"
import { ShoppingBag } from "lucide-react"
import { useCartHook } from "../hooks/cart.hook"

const CartIndicator = ({ isMobile = false }: { isMobile?: boolean }) => {
    const { data: cart } = useCartHook()

    const totalPrice = cart?.reduce((acc, item) => {
        const price = item.product.discountPrice || item.product.price
        return acc + price * item.quantity
    }, 0) || 0

    const TriggerButton = (
        <button className="relative flex items-center gap-3 before:content-[''] before:absolute before:-inset-4 before:cursor-pointer">
            <p className="text-xs">${totalPrice.toFixed(2)}</p>
            {cart && cart.length > 0 && (
                <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                </div>
            )}
            <ShoppingBag strokeWidth={1.5} size={22} />
        </button>
    )

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    {TriggerButton}
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-[400px]">
                    <SheetHeader>
                        <SheetTitle className="text-left font-jost text-lg border-b pb-4">Shopping Cart</SheetTitle>
                    </SheetHeader>
                    <div className="h-full -mt-5">
                        <MiniCart />
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
                {TriggerButton}
            </HoverCardTrigger>

            <HoverCardContent className="w-80" align="start" sideOffset={15}>
                <MiniCart />
            </HoverCardContent>
        </HoverCard>
    )
}

export default CartIndicator