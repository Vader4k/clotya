import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card"
import MiniCart from "./MiniCart"
import { ShoppingBag } from "lucide-react"

const CartIndicator = () => {
    return (
        <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
                <button className="relative flex items-center gap-3 before:content-[''] before:absolute before:-inset-4 before:cursor-pointer">
                    <p className="text-xs">$0.00</p>
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