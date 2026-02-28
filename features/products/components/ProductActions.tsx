import { Heart, Repeat, Maximize } from "lucide-react"

const ProductActions = () => {

    const actions = [
        { icon: Heart, title: "Add to wishlist" },
        { icon: Repeat, title: "Add to compare" },
        { icon: Maximize, title: "Quick view" }
    ]

    return (
        <div className='grid gap-3 overflow-hidden p-1 -m-1'>
            {actions.map((action, index) => (
                <div
                    key={index}
                    className="translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                    style={{ transitionDelay: `${index * 75}ms` }}
                >
                    <button
                        title={action.title}
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