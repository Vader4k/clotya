import { Minus, Plus } from "lucide-react"


const QuantityPicker = ({ quantity, decrease, increase }: { quantity: number, decrease: () => void, increase: () => void }) => {
    return (
        <div className="w-full flex items-center gap-2">
            <div className="flex items-center justify-between h-12 w-full max-w-1/4 border">
                <button className="w-10 h-full flex items-center justify-center">
                    <Minus size={16} strokeWidth={1.5} onClick={decrease} />
                </button>
                <p>{quantity}</p>
                <button className="w-10 h-full flex items-center justify-center">
                    <Plus size={16} strokeWidth={1.5} onClick={increase} />
                </button>
            </div>

            <button className="w-full max-w-3/4 bg-black transition hover:bg-gray-300 text-white h-12 flex items-center justify-center">
                Add to cart
            </button>
        </div>
    )
}

export default QuantityPicker