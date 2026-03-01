"use client"

import { Heart, Repeat, Maximize, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCompareStore } from "@/features/compare/store/compareStore"
import { useState } from "react"
import CompareModal from "@/features/compare/components/CompareModal"

const ProductActions = ({ slug, id, name, image, rating, price, discountPrice }: { slug: string, id: string, name: string, image: string, rating: number, price: number, discountPrice?: number }) => {
    const router = useRouter()
    const { isInCompare, addProduct } = useCompareStore()

    const [modalOpen, setModalOpen] = useState(false)
    const [isDuplicate, setIsDuplicate] = useState(false)

    const maximizeAction = () => {
        router.push(`/product/${slug}`)
    }

    const compareAction = () => {
        if (isInCompare(id)) {
            setIsDuplicate(true)
        } else {
            addProduct({ slug, id, name, image, rating, price, discountPrice })
            setIsDuplicate(false)
        }
        setModalOpen(true)
    }


    const actions = [
        { icon: Heart, title: "Add to wishlist" },
        { icon: Maximize, title: "Quick view", onClick: maximizeAction },
        { icon: isInCompare(id) ? Check : Repeat, title: "Add to compare", onClick: compareAction }
    ]

    return (
        <>
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

            <CompareModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                productName={name}
                isDuplicate={isDuplicate}
            />
        </>
    )
}

export default ProductActions
