"use client";

import {
  LanguageSelector,
  type LanguageSelectorProps,
} from "google-shadcn-translator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectComponents = {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};

export function ShadcnLanguageSelector(props: LanguageSelectorProps) {
  return (
    <LanguageSelector
      selectComponents={selectComponents}
      triggerClassName="w-fit text-nowrap gap-2 notranslate bg-background data-[slot=select-value]:flex data-[slot=select-value]:items-center data-[slot=select-value]:gap-2"
      contentClassName="z-50 notranslate"
      itemClassName="notranslate"
      {...props}
    />
  );
}
