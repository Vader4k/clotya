
export type CurrencyCode = "usd" | "eur" | "gbp" | "aud" | "cad" | "ngn";

export interface CurrencyInfo {
  rate: number; // Conversion rate from USD (base) to this currency
  symbol: string; // The currency symbol to display
  label: string; // Human readable label
}

export interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (priceInUSD: number | undefined | null) => string;
  isMounted: boolean;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  usd: { rate: 1, symbol: "$", label: "USD" },
  eur: { rate: 0.93, symbol: "€", label: "EUR" },
  gbp: { rate: 0.79, symbol: "£", label: "GBP" },
  aud: { rate: 1.53, symbol: "A$", label: "AUD" },
  cad: { rate: 1.37, symbol: "C$", label: "CAD" },
  ngn: { rate: 1500, symbol: "₦", label: "NGN" }, // Approximate conversion rate for UI purposes
};