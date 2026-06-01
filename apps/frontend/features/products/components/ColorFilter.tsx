"use client"

import { colors } from "@/constants"
import { Check } from "lucide-react"

const ColorFilter = ({activeColor, setActiveColor}: {activeColor: string, setActiveColor: (color: string) => void}) => {
  return (
    <div className="font-jost flex flex-col gap-3">
      <h4 className="font-medium text-base mb-3 text-neutral-900">Filter by Color</h4>
      {colors.map((color) => (
        <button onClick={() => setActiveColor(color.name)} key={color.name} className="flex items-center gap-3 group relative">
          <div className="size-5 rounded-full border border-gray-100" style={{ backgroundColor: color.hex }} />
          <label htmlFor={color.name} className="capitalize text-sm">{color.name}</label>
          <Check className={`size-4 text-white invisible group-hover:visible group-focus:visible transition-all duration-200 absolute left-0.5 top-0.9 ${activeColor === color.name ? 'visible' : 'invisible'}`} />
        </button>
      ))}
    </div>
  )
}

export default ColorFilter