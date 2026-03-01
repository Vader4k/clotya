"use client"

import { Heart, Repeat, Maximize } from "lucide-react"
import { useRouter } from "next/navigation"

const ProductActions = ({ slug }: { slug: string }) => {
    const router = useRouter()

    const maximizeAction = () => {
        router.push(`/product/${slug}`)
    }

    const actions = [
        { icon: Heart, title: "Add to wishlist" },
        { icon: Maximize, title: "Quick view", onClick: maximizeAction },
        { icon: Repeat, title: "Add to compare" }
    ]

    return (
        <div className='grid gap-3 overflow-hidden p-1 -m-1'>
            {actions.map((action, index) => (
                <div
                    key={index}
                    className="lg:translate-x-8 opacity-100 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-300 ease-out"
                    style={{ transitionDelay: `${index * 75}ms` }}
                >
                    <button
                        title={action.title}
                        onClick={action.onClick}
                        className="size-9 rounded-full flex items-center justify-center bg-white text-black hover:bg-red-500 hover:text-white transition-colors duration-300 shadow-sm"
                    >
                        <action.icon size={16} />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ProductActions