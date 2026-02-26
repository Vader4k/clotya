"use client"

import { Color } from '@/data/products'

const ColorPicker = ({ colors, selectedColor, setSelectedColor }: { colors: Color[], selectedColor: string | null, setSelectedColor: (color: string) => void }) => {
  return (
    <div>
      <p className='text-sm'>Color: <span className='capitalize'>{selectedColor}</span></p>
      <div className='flex items-center gap-2 my-4'>
        {colors.map((color) => (
          <button
            key={color.name}
            className={`size-7 rounded-full cursor-pointer ${selectedColor === color.name ? 'ring-2 ring-offset-1 ring-red-500' : ''} border transition`}
            style={{ backgroundColor: color.hex }}
            onClick={() => setSelectedColor(color.name)}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker