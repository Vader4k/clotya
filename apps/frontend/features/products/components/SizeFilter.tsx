import { sizes } from '@/constants'
import { Checkbox } from '@/components/ui/checkbox'

const SizeFilter = ({activeSize, setActiveSize}: {activeSize: string, setActiveSize: (size: string) => void}) => {
  return (
    <div className='flex flex-col gap-2 mt-4 font-jost'>
      <h4 className="font-medium text-base mb-3 text-neutral-900">Filter by Size</h4>

      {sizes.map((size) => (
        <div key={size} className='flex items-center gap-3 cursor-pointer'>
          <Checkbox id={size} checked={activeSize === size} onCheckedChange={() => setActiveSize(size)} />
          <label htmlFor={size} className='font-light text-sm uppercase'>{size}</label>
        </div>
      ))}
    </div>
  )
}

export default SizeFilter