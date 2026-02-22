import { Search, Filter } from "lucide-react"
import { bottomNavLinks } from "@/constants"
import Link from "next/link"
import { NavSheet } from "./NavSheet"

const BottomNav = () => {
    return (
        <nav className='w-full bg-white z-50 fixed bottom-0 left-0 py-3 px-10 border-t'>
            <div className="w-full max-w-lg mx-auto flex items-center justify-between text-gray-600 font-jost">
                {bottomNavLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center gap-1.5">
                        <link.icon size={25} strokeWidth={0.7} />
                        <p className="text-[0.6rem] uppercase font-medium">{link.name}</p>
                    </Link>
                ))}
                <button className="flex flex-col items-center justify-center gap-1.5">
                    <Search size={25} strokeWidth={0.7} />
                    <p className="text-[0.6rem] uppercase font-medium">Search</p>
                </button>

                <div className="flex flex-col items-center justify-center gap-1.5">
                    <NavSheet />
                    <p className="text-[0.55rem] uppercase font-medium">categories</p>
                </div>
            </div>
        </nav>
    )
}

export default BottomNav