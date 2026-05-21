"use client"

import {
    GoogleTranslatorProvider,
    type GoogleTranslatorProviderProps,
} from "google-shadcn-translator";

export default function GoogleTranslatorInit(props: GoogleTranslatorProviderProps) {
    return <GoogleTranslatorProvider pageLanguage="en" {...props} />;
}
