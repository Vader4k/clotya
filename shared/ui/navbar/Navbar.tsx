import { Heart, Search, UserRound } from "lucide-react";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { NavSheet } from "./NavSheet";
import CartIndicator from "./CartIndicator";

const Navbar = () => {
  return (
    <nav className="w-full border-y border-gray-200 font-jost px-3 sticky top-0 bg-white z-50">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 lg:py-6">
        {/* links */}
        <div className="flex items-center gap-6 w-full">
          <NavSheet />
          <div className="hidden 2xl:block">
            <Image src="/logo.png" alt="logo" width={120} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
          <div className="hidden 2xl:block">
            <NavLinks />
          </div>
        </div>

        <div className="block 2xl:hidden w-full">
          <Image src="/logo.png" alt="logo" width={120} height={120} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>

        {/* controls */}
        <div className="hidden 2xl:flex items-center gap-4">
          <button>
            <UserRound strokeWidth={1.5} size={22} />
          </button>
          <button>
            <Search strokeWidth={1.5} size={22} />
          </button>
          <button>
            <Heart strokeWidth={1.5} size={22} />
          </button>
          <CartIndicator />
        </div>

        <div className="block 2xl:hidden">
          <CartIndicator />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
