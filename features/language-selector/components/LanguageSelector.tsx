"use client"

import { LanguageSelector as PackageLanguageSelector } from "google-shadcn-translator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LanguageSelector = () => {
    const selectComponents = {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    };

    return (
        <PackageLanguageSelector
            selectComponents={selectComponents}
            className="h-9 w-20 flex items-center justify-center border border-transparent"
            triggerClassName="w-fit text-nowrap gap-2 notranslate bg-background data-[slot=select-value]:flex data-[slot=select-value]:items-center data-[slot=select-value]:gap-2"
            contentClassName="z-50 notranslate"
            itemClassName="notranslate"
        />
    );
}

export default LanguageSelector
