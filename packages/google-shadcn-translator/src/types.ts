import type { ComponentType, ReactNode } from "react";

export type TranslatorLanguage = {
  code: string;
  label: string;
};

export type GoogleTranslatorProviderProps = {
  children?: ReactNode;
  languages?: TranslatorLanguage[];
  pageLanguage?: string;
  elementId?: string;
  autoDisplay?: boolean;
  patchGoogleDomErrors?: boolean;
};

export type LanguageSelectorComponents = {
  Select: ComponentType<any>;
  SelectContent: ComponentType<any>;
  SelectItem: ComponentType<any>;
  SelectTrigger: ComponentType<any>;
  SelectValue: ComponentType<any>;
};

export type LanguageSelectorProps = {
  languages?: TranslatorLanguage[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  selectComponents?: LanguageSelectorComponents;
};

export type GoogleTranslateElementOptions = {
  pageLanguage: string;
  includedLanguages?: string;
  layout?: number;
  autoDisplay?: boolean;
};
