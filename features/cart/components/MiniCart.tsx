"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartHook, useRemoveFromCart } from "../hooks/cart.hook";
import { Loader2, X } from "lucide-react";
import FreeShippingProgress from "./FreeShippingProgress";

const MiniCart = () => {
  const { data: cart = [], isLoading } = useCartHook();
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const totalItems = cart.length;

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      ) : cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <Image
            src="/empty-cart.svg"
            alt="empty-cart-image"
            width={80}
            height={80}
            unoptimized
          />
          <p className="text-sm font-jost text-gray-500 mb-4">
            No product in the cart.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Items List */}
          <div className="flex flex-col h-[450px] lg:h-[150px] overflow-y-auto px-1 no-scrollbar">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 mb-5 mt-2">
                {/* Image */}
                {item.product.images?.[0] ? (
                  <div className="w-[55px] h-[60px] relative shrink-0 bg-gray-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-[55px] h-[60px] bg-gray-100 shrink-0" />
                )}
                {/* Details */}
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-jost text-xs font-medium text-gray-800 line-clamp-2 leading-tight pr-2">
                      {item.product.name}
                    </span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      disabled={isRemoving}
                      className="text-black hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1"
                    >
                      <X size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                  <span className="font-jost font-bold text-[13px] text-gray-800 mb-1">
                    {item.quantity} × $
                    {(item.product.discountPrice || item.product.price).toFixed(
                      2,
                    )}
                  </span>
                  {(item.color || item.size) && (
                    <span className="font-jost text-xs text-gray-600 capitalize font-medium">
                      {item.color && `Color: ${item.color} `}
                      {item.size && `Size: ${item.size}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <hr className="my-2 border-gray-200" />

          {/* Summary */}
          <div className="flex flex-col px-1 mt-3">
            <div className="flex justify-between items-center mb-1 font-jost">
              <span className="text-[#9ea6ab] font-bold text-sm uppercase">
                Subtotal:
              </span>
              <span className="text-[#ed2024] font-bold text-base">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[13px] font-jost text-[#414b56] mb-4 font-medium">
              You have {totalItems} items in your cart
            </p>

            <div className="mb-3">
              <FreeShippingProgress total={totalPrice} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 font-jost pb-2">
              <Link
                href="/cart"
                className="bg-[#aab0b4] text-white text-center text-sm font-bold py-2 hover:bg-[#969fa4] transition-colors tracking-wide"
              >
                View cart
              </Link>
              <Link
                href="/checkout"
                className="bg-[#ed2024] text-white text-center text-sm font-bold py-2 hover:opacity-90 transition-colors tracking-wide"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
