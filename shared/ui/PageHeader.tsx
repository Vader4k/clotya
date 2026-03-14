"use client"

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
import LanguageSelector from "@/features/language-selector/components/LanguageSelector"
import Link from 'next/link';
import { hideNavOnRoutes } from '@/constants';
import { usePathname } from 'next/navigation';

const PageHeader = () => {
  const pathname = usePathname()
  if (hideNavOnRoutes.some((page) => pathname.includes(page))) return null

  return (
    <header className='w-full font-jost border-b'>
      <div className='uppercase text-xs text-center py-3 bg-[#1a4744] text-white'>summer sale for all swim suits and free express international delivery - off 50%! <span className='font-bold'>shop now</span></div>
      <div className='w-full max-w-7xl mx-auto hidden 2xl:flex items-center justify-between py-1'>
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
          <Link href='/order-tracking' className='text-nowrap'>Order Tracking</Link>
          <LanguageSelector />
          <Select value='usd'>
            <SelectTrigger translate='no' className="w-full max-w-20 bg-white text-xs outline-none notranslate" suppressHydrationWarning>
              <SelectValue translate='no' placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="notranslate">
              <SelectGroup className="notranslate">
                <SelectLabel className="notranslate">Currency</SelectLabel>
                <SelectItem value="usd" className="notranslate">USD</SelectItem>
                <SelectItem value="eur" className="notranslate">EUR</SelectItem>
                <SelectItem value="gbp" className="notranslate">GBP</SelectItem>
                <SelectItem value="aud" className="notranslate">AUD</SelectItem>
                <SelectItem value="cad" className="notranslate">CAD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}

export default PageHeader