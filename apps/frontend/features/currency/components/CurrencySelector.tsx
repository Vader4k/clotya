"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency, CURRENCIES } from "../context/CurrencyContext";
import { CurrencyCode } from "../types/cuccency.types";

const CurrencySelector = () => {
  const { currency, setCurrency, isMounted } = useCurrency();

  // Avoid hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <Select value="usd">
        <SelectTrigger translate="no" className="w-full max-w-20 bg-white text-xs outline-none notranslate" suppressHydrationWarning>
          <SelectValue translate="no" placeholder="Currency" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
      <SelectTrigger translate="no" className="w-full max-w-20 bg-white text-xs outline-none notranslate" suppressHydrationWarning>
        <SelectValue translate="no" placeholder="Currency" />
      </SelectTrigger>
      <SelectContent className="notranslate">
        <SelectGroup className="notranslate">
          <SelectLabel className="notranslate">Currency</SelectLabel>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
            <SelectItem key={code} value={code} className="notranslate">
              {CURRENCIES[code].label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
