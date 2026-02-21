"use client"

import { TabProps } from "../types/categories.types"

const CategoriesTab = ({ selected, setSelected, categories }: TabProps) => {
    return (
        <div className="w-full">
            <div className="w-full flex items-center justify-center gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelected(category)}
                        className={`${selected === category ? "text-black" : "text-gray-300 hover:text-gray-400"} text-2xl capitalize font-jost font-medium transition-colors duration-300`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <p className="text-center text-gray-400 text-sm my-6 font-light max-w-lg mx-auto leading-relaxed capitalize">
                Explore our curated collections of premium apparel, designed for every occasion and crafted with quality and style in mind.
            </p>
        </div>
    )
}

export default CategoriesTab