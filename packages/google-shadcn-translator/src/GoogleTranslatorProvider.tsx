"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLanguages } from "./languages";
import type {
  GoogleTranslateElementOptions,
  GoogleTranslatorProviderProps,
  TranslatorLanguage,
} from "./types";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: GoogleTranslateElementOptions,
          elementId: string
        ) => unknown;
      };
    };
  }
}

type GoogleTranslatorContextValue = {
  currentLanguage: string;
  languages: TranslatorLanguage[];
  changeLanguage: (languageCode: string) => void;
  isReady: boolean;
};

const GoogleTranslatorContext =
  createContext<GoogleTranslatorContextValue | null>(null);

const GOOGLE_TRANSLATE_SCRIPT_ID = "google-translate-element-script";

function getGoogleCombo() {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLSelectElement>(".goog-te-combo");
}

function installGoogleDomPatch() {
  const originalRemoveChild = window.Node.prototype.removeChild;
  const originalInsertBefore = window.Node.prototype.insertBefore;

  window.Node.prototype.removeChild = function <T extends Node>(child: T): T {
    try {
      if (child.parentNode !== this) return child;
      return originalRemoveChild.call(this, child) as T;
    } catch {
      return child;
    }
  };

  window.Node.prototype.insertBefore = function <T extends Node>(
    newChild: T,
    refChild: Node | null
  ): T {
    try {
      if (refChild && refChild.parentNode !== this) {
        return this.appendChild(newChild) as T;
      }
      return originalInsertBefore.call(this, newChild, refChild) as T;
    } catch {
      try {
        return this.appendChild(newChild) as T;
      } catch {
        return newChild;
      }
    }
  };

  return () => {
    window.Node.prototype.removeChild = originalRemoveChild;
    window.Node.prototype.insertBefore = originalInsertBefore;
  };
}

export function GoogleTranslatorProvider({
  children,
  languages = defaultLanguages,
  pageLanguage = "en",
  elementId = "google_translate_element",
  autoDisplay = false,
  patchGoogleDomErrors = true,
}: GoogleTranslatorProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(pageLanguage);
  const [isReady, setIsReady] = useState(false);

  const includedLanguages = useMemo(
    () => languages.map((language) => language.code).join(","),
    [languages]
  );

  const changeLanguage = useCallback((languageCode: string) => {
    setCurrentLanguage(languageCode);

    const googleCombo = getGoogleCombo();
    if (!googleCombo) return;

    googleCombo.value = languageCode;
    googleCombo.dispatchEvent(new Event("change", { bubbles: true }));
  }, []);

  useEffect(() => {
    let restoreGoogleDomPatch: (() => void) | undefined;

    if (patchGoogleDomErrors) {
      restoreGoogleDomPatch = installGoogleDomPatch();
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage,
          includedLanguages,
          autoDisplay,
        },
        elementId
      );
      setIsReady(true);
    };

    if (window.google?.translate) {
      window.googleTranslateElementInit();
    } else if (!document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      restoreGoogleDomPatch?.();
      delete window.googleTranslateElementInit;
    };
  }, [
    autoDisplay,
    elementId,
    includedLanguages,
    pageLanguage,
    patchGoogleDomErrors,
  ]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const googleCombo = getGoogleCombo();
      if (googleCombo?.value) {
        setCurrentLanguage(googleCombo.value);
      }
    });

    const checkCombo = window.setInterval(() => {
      const googleCombo = getGoogleCombo();
      if (!googleCombo?.parentElement) return;

      observer.observe(googleCombo.parentElement, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      setIsReady(true);
      window.clearInterval(checkCombo);
    }, 100);

    return () => {
      observer.disconnect();
      window.clearInterval(checkCombo);
    };
  }, []);

  const value = useMemo(
    () => ({
      currentLanguage,
      languages,
      changeLanguage,
      isReady,
    }),
    [changeLanguage, currentLanguage, isReady, languages]
  );

  return (
    <GoogleTranslatorContext.Provider value={value}>
      <div id={elementId} className="google-shadcn-translator-hidden" />
      {children}
    </GoogleTranslatorContext.Provider>
  );
}

export function useGoogleTranslator() {
  const context = useContext(GoogleTranslatorContext);

  if (!context) {
    throw new Error(
      "useGoogleTranslator must be used inside GoogleTranslatorProvider."
    );
  }

  return context;
}
