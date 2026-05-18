"use client";

import { useCurrency } from "../context/CurrencyContext";

interface ProductPriceProps {
  price: number | undefined | null;
  className?: string;
}

export const ProductPrice = ({ price, className }: ProductPriceProps) => {
  const { formatPrice } = useCurrency();
  return <span className={className}>{formatPrice(price)}</span>;
};
