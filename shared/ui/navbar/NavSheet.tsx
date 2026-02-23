import { sheetLinks } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function NavSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Menu size={25} strokeWidth={0.7} />
                </button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="px-6">
                    <SheetTitle>
                        <Image src="/logo.png" alt="logo" width={110} height={110} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <div className="mask-[linear-gradient(to_bottom,#000,#000_80%,transparent_100%)] grid flex-1 auto-rows-min gap-6 px-6 pb-12 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}>
                    {Object.entries(sheetLinks).map(([key, value]) => (
                        <div key={key} className="grid gap-4 font-jost">
                            <h3 className="text-sm font-medium capitalize">{key}</h3>
                            <div className="grid gap-4">
                                {value.map((link) => (
                                    <Link key={link.name} href={link.href} className="capitalize w-full flex items-center justify-between">{link.name} {link.tag && (
                                        <span className={`text-xs text-white px-3 py-0.3 rounded-lg font-semibold opacity-50 ${link.tag === 'hot' ? 'bg-red-500' :
                                            link.tag === 'new' ? 'bg-yellow-500' :
                                                link.tag.includes('save') ? 'bg-red-500' : ''}`}>{link.tag}</span>
                                    )}</Link>
                                ))}
                            </div>
                            {key !== 'categories' && <div className="w-full h-px bg-gray-200 mt-4" />}
                        </div>
                    ))}
                </div>
                <SheetFooter className="px-6">
                    <p className="text-xs text-gray-500">Copyright © 2026 Clotya. All rights reserved.</p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
