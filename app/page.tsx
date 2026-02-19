import Advert from '@/sections/home/Advert'
import BestSeller from '@/sections/home/BestSeller'
import Categories from '@/sections/home/Categories'
import CategoryGrid from '@/sections/home/CategoryGrid'
import Contact from '@/sections/home/Contact'
import Hero from '@/sections/home/Hero'
import News from '@/sections/home/News'


const page = () => {
  return (
    <main className='grid gap-18'>
      <Hero />
      <BestSeller />
      <CategoryGrid />
      <Categories />
      <Advert />
      <CategoryGrid />
      <News />
      <Contact />
    </main>
  )
}

export default page