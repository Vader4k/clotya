import { Heart, UserRound } from "lucide-react";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { NavSheet } from "./NavSheet";
import CartIndicator from "./CartIndicator";
import SearchModal from "@/features/search/components/SearchModal";

const NavbarLogo = ({width, height}: {width: number, height: number}) => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="aspect-[4.49]"
      priority
    />
  )
}


const Navbar = () => {
  return (
    <nav className="w-full border-y border-gray-200 font-jost px-3 sticky xl:relative top-0 bg-white z-50">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 lg:py-6">
        {/* links */}
        <div className="flex items-center gap-8 w-full flex-1">
          <NavSheet />
          <div className="hidden xl:block">
            <NavbarLogo width={120} height={120}/>
          </div>
          <div className="hidden xl:block">
            <NavLinks />
          </div>
        </div>

        <div className="xl:hidden w-full flex-1 flex items-center justify-center">
          <NavbarLogo width={100} height={100} />
        </div>

        {/* controls */}
        <div className="hidden xl:flex items-center gap-4">
          <button>
            <UserRound strokeWidth={1.5} size={22} />
          </button>
          <div>
            <SearchModal isMobile={false}/>
          </div>
          <button>
            <Heart strokeWidth={1.5} size={22} />
          </button>
          <CartIndicator />
        </div>

        <div className="xl:hidden w-full flex-1 flex items-center justify-end">
          <CartIndicator />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
