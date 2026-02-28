'use client'

import { bottomNavLinks, shopNavLinks } from "@/constants"
import Link from "next/link"
import { NavSheet } from "./NavSheet"
import FilterSheet from "./FilterSheet"
import { usePathname } from "next/navigation"
import SearchModal from "@/features/search/components/SearchModal"

const BottomNav = () => {
    const pathname = usePathname()
    const isShopPage = pathname.startsWith('/shop')
    const links = isShopPage ? shopNavLinks : bottomNavLinks

    return (
        <nav className='w-full bg-white z-50 fixed bottom-0 left-0 py-3 px-10 border-t border-gray-300'>
            <div className="w-full max-w-lg mx-auto flex items-center justify-between text-gray-600 font-jost">
                {links.map((link) => (
                    <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center gap-1.5">
                        <link.icon size={25} strokeWidth={0.7} />
                        <p className="text-[0.6rem] uppercase font-medium">{link.name}</p>
                    </Link>
                ))}
                <div className="flex flex-col items-center justify-center">
                    <SearchModal isMobile={true} />
                    <p className="text-[0.6rem] uppercase font-medium">Search</p>
                </div>

                {isShopPage ?
                    <FilterSheet /> :
                    <div className="flex flex-col items-center justify-center gap-1.5">
                        <NavSheet />
                        <p className="text-[0.55rem] uppercase font-medium">categories</p>
                    </div>}
            </div>
        </nav>
    )
}

export default BottomNav