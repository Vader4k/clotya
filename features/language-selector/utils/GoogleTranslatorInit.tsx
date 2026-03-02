"use client"

import { languages } from "../../../data/languages";
import { useEffect } from "react"
import Script from "next/script";

interface TranslateElementOptions {
    pageLanguage: string;
    includedLanguages?: string;
    layout?: number;
    autoDisplay?: boolean;
}

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google: {
            translate: {
                TranslateElement: new (options: TranslateElementOptions, elementId: string) => {
                    init: () => void;
                    translatePage: () => void;
                }
            }
        }
    }
}

export default function GoogleTranslatorInit() {
    useEffect(() => {
        const originalRemoveChild = window.Node.prototype.removeChild;
        const originalInsertBefore = window.Node.prototype.insertBefore;

        window.Node.prototype.removeChild = function <T extends Node>(child: T): T {
            try {
                if (child.parentNode !== this) return child;
                return originalRemoveChild.call(this, child) as T;
            } catch (error) {
                console.warn("Suppressed removeChild error:", error);
                return child;
            }
        };

        window.Node.prototype.insertBefore = function <T extends Node>(newChild: T, refChild: Node | null): T {
            try {
                if (refChild && refChild.parentNode !== this) {
                    console.warn("Ref child not found; falling back to appendChild");
                    return this.appendChild(newChild) as T;
                }
                return originalInsertBefore.call(this, newChild, refChild) as T;
            } catch (error) {
                console.warn("Suppressed insertBefore error:", error);
                try {
                    return this.appendChild(newChild) as T;
                } catch (appendError) {
                    console.error("Fallback appendChild also failed:", appendError);
                    return newChild;
                }
            }
        };

        // Define the init function on the window
        window.googleTranslateElementInit = () => {
            if (window.google?.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "auto",
                        includedLanguages: languages.map((lang) => lang.code).join(","),
                    },
                    "google_translate_element"
                );
            }
        };

        return () => {
            Node.prototype.removeChild = originalRemoveChild;
            Node.prototype.insertBefore = originalInsertBefore;
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <>
            <div id="google_translate_element" className="hidden" />
            <Script
                src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="afterInteractive"
            />
        </>
    );
}
