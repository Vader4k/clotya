# google-shadcn-translator

A small React wrapper around the Google Translate website widget, with a reusable language selector that can use your app's shadcn/ui `Select` components.

## Install

```bash
npm install google-shadcn-translator
```

## Basic Usage

Import the provider once near the root of your app and import the CSS globally.

```tsx
import {
  GoogleTranslatorProvider,
  LanguageSelector,
} from "google-shadcn-translator";
import "google-shadcn-translator/styles.css";

export function App() {
  return (
    <GoogleTranslatorProvider pageLanguage="en">
      <LanguageSelector />
    </GoogleTranslatorProvider>
  );
}
```

## With shadcn/ui Select

Pass your local shadcn select components into `LanguageSelector`.

```tsx
import {
  GoogleTranslatorProvider,
  LanguageSelector,
} from "google-shadcn-translator";
import "google-shadcn-translator/styles.css";
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

export function HeaderLanguageSelector() {
  return (
    <GoogleTranslatorProvider pageLanguage="en">
      <LanguageSelector
        selectComponents={selectComponents}
        triggerClassName="w-fit text-nowrap gap-2 notranslate bg-background"
        contentClassName="z-50 notranslate"
        itemClassName="notranslate"
      />
    </GoogleTranslatorProvider>
  );
}
```

## Custom Languages

```tsx
<GoogleTranslatorProvider
  pageLanguage="en"
  languages={[
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "yo", label: "Yoruba" },
  ]}
>
  <LanguageSelector />
</GoogleTranslatorProvider>
```

## Notes

This package uses the Google Translate website widget. Google can change the widget markup and class names, so treat it as a convenient website enhancement rather than a formal translation API integration.
