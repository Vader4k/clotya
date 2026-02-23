import ShopClient from '@/sections/shop/ShopClient'
import { PageProp } from '@/sections/shop/types/shop.types'

const page = async({searchParams}: PageProp) => {
    console.log(searchParams)
  return (
    <ShopClient />
  )
}

export default page