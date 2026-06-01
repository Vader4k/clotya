"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { CurrencyCode, CurrencyInfo, CurrencyContextType } from "../types/cuccency.types";


export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  usd: { rate: 1, symbol: "$", label: "USD" },
  eur: { rate: 0.93, symbol: "€", label: "EUR" },
  gbp: { rate: 0.79, symbol: "£", label: "GBP" },
  aud: { rate: 1.53, symbol: "A$", label: "AUD" },
  cad: { rate: 1.37, symbol: "C$", label: "CAD" },
  ngn: { rate: 1500, symbol: "₦", label: "NGN" }, // Approximate conversion rate for UI purposes
};


const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>("usd");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("clotya_currency") as CurrencyCode;
    if (stored && CURRENCIES[stored]) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("clotya_currency", newCurrency);
  };

  const formatPrice = (priceInUSD: number | undefined | null) => {
    if (priceInUSD == null) return `${CURRENCIES[currency].symbol}0.00`;

    // During SSR or first render before hydration, we must return a stable value 
    // to prevent hydration mismatch. We'll use USD as the fallback.
    const activeCurrency = isMounted ? currency : "usd";
    const { rate, symbol } = CURRENCIES[activeCurrency];
    const converted = priceInUSD * rate;

    // Format to 2 decimal places or 0 if it's an integer
    return `${symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, isMounted }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
