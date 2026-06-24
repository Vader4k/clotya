import { sheetLinks } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { NativeSheet, NativeSheetClose } from "./NativeSheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NavSheet() {
    return (
        <NativeSheet
            side="left"
            trigger={
                <button name="menu-open" title="menu-open">
                    <Menu size={25} strokeWidth={0.7} />
                </button>
            }
        >
            {/* Scrollable Links */}
            <div className="mask-[linear-gradient(to_bottom,#000,#000_80%,transparent_100%)] grid flex-1 auto-rows-min gap-6 pb-12 overflow-y-auto" aria-hidden="false" aria-label="progress-bar" style={{ scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}>
                <div className="grid gap-6 px-6 pb-12">
                    {Object.entries(sheetLinks).map(([key, value]) => (
                        <div key={key} className="grid gap-4 font-jost">
                            <h3 className="text-sm font-medium capitalize">{key}</h3>
                            <div className="grid gap-4">
                                {value.map((link) => (
                                    <NativeSheetClose key={link.name}>
                                        <Link href={link.href} className="capitalize w-full flex items-center justify-between">{link.name} {link.tag && (
                                            <span className={`text-xs text-white px-3 py-0.3 rounded-lg font-semibold opacity-50 ${link.tag === 'hot' ? 'bg-red-500' :
                                                link.tag === 'new' ? 'bg-yellow-500' :
                                                    link.tag.includes('save') ? 'bg-red-500' : ''}`}>{link.tag}</span>
                                        )}</Link>
                                    </NativeSheetClose>
                                ))}
                            </div>
                            {key !== 'categories' && <div className="w-full h-px bg-gray-200 mt-4" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto px-6 py-4 shrink-0">
                <p className="text-xs text-gray-500">Copyright © 2026 Stylr. All rights reserved.</p>
            </div>
        </NativeSheet>
    )
}
