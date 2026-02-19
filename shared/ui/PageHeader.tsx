
import { ChevronDown, Instagram } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PageHeader = () => {
  return (
    <header className='w-full font-jost'>
      <div className='uppercase text-xs text-center py-3 bg-[#1a4744] text-white'>summer sale for all swim suits and free express international delivery - off 50%! <span className='font-bold'>shop now</span></div>
      <div className='w-full max-w-7xl mx-auto flex items-center justify-between py-1'>
        <div className='flex items-center gap-10'>
          <button className='flex items-center gap-2 text-xs text-black'>
            <Instagram size={16} strokeWidth={2} />
            <span className='font-semibold'> 3.1M Followers</span>
            <ChevronDown size={12} strokeWidth={2} fill='black' />
          </button>
          <p className='text-xs'>Free Shipping World Wide for all orders over $199. <span className='text-red-600'>Click and Shop Now.</span></p>
        </div>

        {/*controls */}
        <div className='flex items-center gap-3 text-xs'>
          <p className='text-nowrap'>Order Tracking</p>
          <Select value='usd'>
            <SelectTrigger className="w-full max-w-20 bg-white text-xs outline-none">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Currency</SelectLabel>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
                <SelectItem value="aud">AUD</SelectItem>
                <SelectItem value="cad">CAD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}

export default PageHeader