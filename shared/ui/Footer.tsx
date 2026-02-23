import { Input } from "@/components/ui/input"
import { Apple, Play } from "lucide-react"
import Link from "next/link"
import { footerLinks, phone, email } from "@/constants"
import Image from "next/image"


const StoreLinks = ({ href, children, icon }: { href: string, children: React.ReactNode, icon: React.ReactNode }) => {
  return (
    <Link href={href} className="border border-neutral-600 w-fit h-11 rounded-md flex items-center justify-center gap-1.5 px-1.5">
      {icon}
      {children}
    </Link>
  )
}

const Footer = () => {
  return (
    <footer className='2xl:h-[110vh] font-jost'>
      <div className='w-full bg-black text-white h-1/2 flex items-center justify-start py-10 2xl:py-0 px-3'>
        <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10'>
          <div className='w-full flex-1 flex flex-col gap-3'>
            <h3 className="text-2xl lg:text-3xl font-medium">Get our emails for info on <br className="hidden lg:block"/>new items, sales and more.</h3>
            <p className="text-neutral-300/60">We'll email you a voucher worth $10 off your first order over $50.</p>

            <div className="flex item-center mt-6">
              <Input placeholder="Enter your email address" className='max-w-sm bg-white h-11 rounded-none text-black' />
              <button className='bg-black text-white h-11 px-6 font-medium border border-neutral-500'>Subscribe</button>
            </div>
            <p className="text-xs text-neutral-300/60">By subscribing you agree to our <a href="#">Terms & Condition</a> and <a href="#">Privacy Policy & Cookies Policy</a></p>
          </div>

          <div>
            <div className='w-full flex-1 flex flex-col items-start gap-3'>
              <h3 className="text-2xl lg:text-3xl font-medium">Need help? <br /> {phone}</h3>
              <p className="text-neutral-300/60">We are available 8:00am — 7:00pm</p>

              <div className=" mt-4 flex items-center gap-2">
                <StoreLinks href="#" icon={<Apple fill="white" />}>
                  <div className="flex flex-col">
                    <span className="text-[0.4rem] text-neutral-300/60 uppercase">Download on the</span>
                    <p className=" font-medium leading-4 font-inter">App Store</p>
                  </div>
                </StoreLinks>
                <StoreLinks href="#" icon={<Play fill="white" />}>
                  <div className="flex flex-col">
                    <span className="text-[0.5rem] text-neutral-300/60 uppercase">Get it on</span>
                    <p className=" font-medium leading-3.5 font-inter text-nowrap">Google Play</p>
                  </div>
                </StoreLinks>
              </div>
              <p className="text-xs text-neutral-300/60"><b>Shipping App: </b>Try our View in Your Room feature, manage registries and save payment info.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-white text-black h-full max-h-1/2 py-10 xl:py-20 2xl:py-10 px-3 mb-16 xl:mb-0'>
        <div className='w-full max-w-7xl mx-auto h-full flex flex-col justify-between'>
          <div className="grid 2xl:grid-cols-6 gap-10 w-full">
            <div className="col-span-2 grid gap-2">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
              <p className="text-neutral-600 font-light text-xs md:text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
              <p className="text-xs md:text-sm">{phone} — {email}</p>
            </div>
            {Object.entries(footerLinks).map(([key, value]) => (
              <div key={key} className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-medium capitalize">{key}</h3>
                <ul className="mt-4">
                  {value.map((link) => (
                    <li key={link.name} className="mb-2">
                      <Link href={link.href} className="text-sm text-neutral-600 hover:text-black">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full border-t border-neutral-200 mt-10 pt-5 hidden xl:block">
            <p className="text-center text-sm text-neutral-600">© 2026 Clotya. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer