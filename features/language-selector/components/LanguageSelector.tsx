"use client"

import { useState, useEffect } from "react";
import { languages } from "@/data/languages";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LanguageSelector = () => {
    const [currentLanguage, setCurrentLanguage] = useState("en");

    // Sync currentLanguage with Google Translate's actual state
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const googleCombo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
            if (googleCombo && googleCombo.value !== currentLanguage) {
                setCurrentLanguage(googleCombo.value);
            }
        });

        // Observe the combo element once it exists
        const checkCombo = setInterval(() => {
            const combo = document.querySelector(".goog-te-combo");
            if (combo) {
                observer.observe(combo.parentElement!, { attributes: true, childList: true, subtree: true });
                clearInterval(checkCombo);
            }
        }, 100);

        return () => {
            observer.disconnect();
            clearInterval(checkCombo);
        };
    }, [currentLanguage]);

    // Keep handleLanguageChange
    const handleLanguageChange = (langCode: string) => {
        setCurrentLanguage(langCode);

        const googleCombo =
            document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (googleCombo) {
            googleCombo.value = langCode;
            googleCombo.dispatchEvent(new Event("change", { bubbles: true }));
        }
    };

    return (
        <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-fit text-nowrap gap-2 notranslate bg-background data-[slot=select-value]:flex data-[slot=select-value]:items-center data-[slot=select-value]:gap-2">
                <SelectValue translate="no" className="notranslate" placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="z-50 notranslate">
                {languages.map((lang) => (
                    <SelectItem
                        key={lang.code}
                        value={lang.code}
                        className="notranslate"
                        translate="no"
                    >
                        {lang.language}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default LanguageSelector