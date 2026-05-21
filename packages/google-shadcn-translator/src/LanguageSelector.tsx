"use client";

import { useEffect, useState } from "react";
import { useGoogleTranslator } from "./GoogleTranslatorProvider";
import type { LanguageSelectorProps } from "./types";

export function LanguageSelector({
  languages,
  placeholder = "Language",
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  selectComponents,
}: LanguageSelectorProps) {
  const translator = useGoogleTranslator();
  const [mounted, setMounted] = useState(false);
  const languageOptions = languages ?? translator.languages;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className ?? "h-9 w-20 border border-transparent"}
        aria-hidden="true"
      />
    );
  }

  if (!selectComponents) {
    return (
      <select
        className={className}
        value={translator.currentLanguage}
        onChange={(event) => translator.changeLanguage(event.target.value)}
        translate="no"
        suppressHydrationWarning
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    );
  }

  const {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } = selectComponents;

  return (
    <Select
      value={translator.currentLanguage}
      onValueChange={translator.changeLanguage}
    >
      <SelectTrigger
        className={triggerClassName}
        translate="no"
        suppressHydrationWarning
      >
        <SelectValue
          translate="no"
          className="notranslate"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {languageOptions.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className={itemClassName}
            translate="no"
          >
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

