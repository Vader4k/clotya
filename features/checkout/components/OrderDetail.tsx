"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { BillingDetailsType } from "../schema/checkout.schema";
import { CartItem } from "../../cart/types/cart.types";
import { Loader2, Info } from 'lucide-react';
import { useCurrency } from "@/features/currency/context/CurrencyContext";

const OrderDetail = ({
  cartItems,
  paying,
}: {
  cartItems: CartItem[];
  paying: boolean;
}) => {
  const { register } = useFormContext<BillingDetailsType>();
  const shipmentType = useWatch({ name: "shipmentType" });
  const isTermsAccepted = useWatch({name: 'terms'});
  const { formatPrice, currency } = useCurrency();

  const methodTypes = [
    { label: `Flat rate: ${formatPrice(15)}`, value: 15, id: "standard" },
    { label: "Local pickup", value: 0, id: "local_pickup" },
  ] as const;

  const paymentMethods = [
    { label: "Paystack", value: "paystack" },
    { label: "Direct bank transfer", value: "bank_transfer" },
    { label: "Cash on delivery", value: "cash_on_delivery" },
  ] as const;

  const selectedShippingMethod =
    methodTypes.find((m) => m.id === shipmentType) || methodTypes[0];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <aside className="w-full border p-9 grid gap-4 rounded">
      <h4 className="text-lg font-medium">Your order</h4>
      <div className="flex items-center justify-between border-b pb-4 font-medium text-sm">
        <p>Product</p>
        <p>Subtotal</p>
      </div>
      <div className="grid gap-2">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="w-full flex items-center justify-between text-xs"
          >
            <div>
              <p>{item.product.name}</p>
              <p className="font-medium">x {item.quantity}</p>
              <div className="flex items-center gap-1">
                {item.color && (
                  <p className="capitalize">Color: {item.color}</p>
                )}
                {item.size && (
                  <p className="">Size: {item.size.toUpperCase()}</p>
                )}
              </div>
            </div>
            <p>{formatPrice(item.product.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-y py-3 text-xs">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">Subtotal</p>
          <p className="text-sm">{formatPrice(subtotal)}</p>
        </div>
      </div>
      <div className="border-b py-4 text-xs flex items-center justify-between">
        <p className="font-medium text-sm">Shipment</p>
        <div className="flex flex-col justify-end items-end gap-2">
          {methodTypes.map((method) => (
            <div
              key={method.id}
              className="grid grid-cols-[auto_1fr] items-center gap-2"
            >
              <label htmlFor={method.id}>{method.label}</label>
              <input
                type="radio"
                {...register("shipmentType")}
                id={method.id}
                value={method.id}
                className="accent-red-500"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex text-sm items-center justify-between pb-3 border-b">
        <p className="text-sm font-medium">Total</p>
        <h2 className="font-semibold text-lg">
          {formatPrice(subtotal + selectedShippingMethod.value)}
        </h2>
      </div>
      <div className="w-full py-3 grid gap-4">
        <div className="text-sm grid gap-3 mb-4">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              className="w-full flex items-center justify-between"
            >
              <label
                htmlFor={method.value}
                className="font-semibold capitalize"
              >
                {method.label}
              </label>
              <input
                type="radio"
                {...register("paymentType")}
                id={method.value}
                value={method.value}
                className="accent-red-500"
              />
            </div>
          ))}
        </div>
        <p className="text-sm leading-5 text-neutral-500">
          our personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <input type="checkbox" {...register("terms")} className="accent-red-500" />
          <div className="text-sm w-fit">
            I have read and agree to the website{" "}
            <button type="button" className="underline text-red-500">
              terms and conditions
            </button>
          </div>
        </div>
        
        {currency !== 'ngn' && (
          <div className="bg-blue-50 text-blue-800 p-3 rounded text-xs flex items-start gap-2">
            <Info size={16} className="shrink-0 mt-0.5" />
            <p>Please note: All final payments are processed in Naira (NGN). Your card will be charged the equivalent amount in NGN based on current exchange rates.</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={paying || !isTermsAccepted}
          className="w-full mt-4 bg-red-500 text-white py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paying ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2
                className="animate-spin"
                size={16}
                strokeWidth={1.5}
              />{" "}
              <span>Processing...</span>
            </div>
          ) : (
            "Place order"
          )}
        </button>
      </div>
    </aside>
  );
};

export default OrderDetail;
