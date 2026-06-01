import { navLinks } from '@/constants'
import Link from 'next/link'

const NavLinks = () => {
    return (
        <div className="flex items-center gap-10 ml-4">
            {navLinks.map((link) => (
                <Link href={link.href} key={link.id} className="uppercase font-medium text-[0.9rem]">
                    {link.name}
                </Link>
            ))}
        </div>
    )
}

export default NavLinks