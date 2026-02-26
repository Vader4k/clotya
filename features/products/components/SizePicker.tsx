
const SizePicker = ({ 
    sizes, 
    selectedSize, 
    setSize,
    setStock 
}: { 
    sizes: { size: string, quantity: number }[], 
    selectedSize: string | null, 
    setSize: (size: string) => void,
    setStock: (stock: number) => void 
}) => {
  return (
    <div>
      <p className='text-sm'>Size: <span className='capitalize'>{selectedSize}</span></p>
      <div className='flex items-center gap-2 my-4 flex-wrap'>
        {sizes.map((size) => (
          <button
            key={size.size}
            className={`h-8 w-18 cursor-pointer ${selectedSize === size.size ? 'bg-red-500 text-white' : ''} border transition`}
            onClick={() => {
                setSize(size.size)
                setStock(size.quantity)
            }}
          >
            {size.size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizePicker