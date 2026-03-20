"use client"
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card"
import MiniCart from "./MiniCart"
import { ShoppingBag } from "lucide-react"
import { useCartHook } from "../hooks/cart.hook"

const CartIndicator = () => {
    const { data: cart } = useCartHook()

    const totalPrice = cart?.reduce((acc, item) => {
        const price = item.product.discountPrice || item.product.price
        return acc + price * item.quantity
    }, 0) || 0

    return (
        <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
                <button className="relative flex items-center gap-3 before:content-[''] before:absolute before:-inset-4 before:cursor-pointer">
                    <p className="text-xs">${totalPrice.toFixed(2)}</p>
                    {cart && cart.length > 0 && (
                        <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            {cart.length}
                        </div>
                    )}
                    <ShoppingBag strokeWidth={1.5} size={22} />
                </button>
            </HoverCardTrigger>

            <HoverCardContent className="w-80" align="end" sideOffset={15}>
                <MiniCart />
            </HoverCardContent>
        </HoverCard>
    )
}

export default CartIndicator