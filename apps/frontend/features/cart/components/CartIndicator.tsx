"use client"
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card"
import MiniCart from "./MiniCart"
import { ShoppingBag } from "lucide-react"
import { useCartHook } from "../hooks/cart.hook"
import { useCurrency } from "@/features/currency/context/CurrencyContext"
import { NativeSheet } from "@/shared/ui/navbar/NativeSheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const CartIndicator = ({ isMobile = false }: { isMobile?: boolean }) => {
    const { data: cart } = useCartHook()
    const { formatPrice } = useCurrency()

    const totalPrice = cart?.items?.reduce((acc, item) => {
        const price = item.product.discountPrice || item.product.price
        return acc + price * item.quantity
    }, 0) || 0

    const TriggerButton = (
        <button className="relative flex items-center gap-3 before:content-[''] before:absolute before:-inset-4 before:cursor-pointer">
            <p className="text-xs">{formatPrice(totalPrice)}</p>
            {cart && cart.items.length > 0 && (
                <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.items.length}
                </div>
            )}
            <ShoppingBag strokeWidth={1.5} size={22} />
        </button>
    )

    if (isMobile) {
        return (
            <NativeSheet
                side="right"
                title="Shopping Cart"
                trigger={TriggerButton}
                className="w-[85vw] max-w-[400px]"
            >
                <ScrollArea className="flex-1 min-h-0">
                    <div className="h-full -mt-5">
                        <MiniCart />
                    </div>
                </ScrollArea>
            </NativeSheet>
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