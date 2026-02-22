import { MoveRight } from "lucide-react"
import Link from "next/link"


const Advert = () => {
  return (
    <section className="w-full flex flex-col 2xl:flex-row items-start h-160 md:h-220 2xl:h-100 gap-8 mb-20">
      <div className="w-full 2xl:max-w-[70%] h-full advert1 flex flex-col items-start justify-center font-jost gap-3 p-6 md:p-10">
        <span className="font-semibold">Summer collection</span>
        <h3 className="text-2xl md:text-4xl font-medium">Show your best sweatshirt of <br />your life</h3>
        <p className="text-sm text-balance font-inter font-light">Don't miss the opportunity</p>
        <Link href={'/shop'} className="mt-6 font-medium flex items-center gap-3">
          Shop Collection <MoveRight />
        </Link>
      </div>

      <div className="w-full 2xl:max-w-[30%] h-full advert2 flex flex-col gap-3 font-jost items-center justify-center text-white">
        <span className="font-semibold uppercase">New season sale</span>
        <h3 className="text-2xl md:text-4xl font-medium">Up to 70% off</h3>
        <p className="text-sm text-balance font-inter font-light text-gray-300">Don't miss the opportunity</p>
        <Link href={'/shop'} className="mt-6 font-medium flex items-center gap-3">
          Shop Collection <MoveRight />
        </Link>
      </div>
    </section>
  )
}

export default Advert