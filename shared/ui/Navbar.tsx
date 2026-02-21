import { navLinks } from "@/constants";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-y border-gray-200 font-jost">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-6">
        {/* links */}
        <div className="flex items-center gap-6">
          <Menu strokeWidth={1} />
          <Image src="/logo.png" alt="logo" width={120} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          <div className="flex items-center gap-8 ml-4">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.id} className="uppercase font-medium text-[0.9rem]">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center gap-4">
          <button>
            <UserRound strokeWidth={1.5} size={22} />
          </button>
          <button>
            <Search strokeWidth={1.5} size={22} />
          </button>
            <button>
            <Heart strokeWidth={1.5} size={22} />
          </button>
          <button className="flex items-center gap-3">
            <p className="text-xs">$0.00</p>
            <ShoppingBag strokeWidth={1.5} size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
