"use client"

import { useCartHook } from '@/features/cart/hooks/cart.hook'
import CartItemList from '@/features/cart/components/CartItemList'
import CartSummary from '@/features/cart/components/CartSummary'
import FreeShippingProgress from '@/features/cart/components/FreeShippingProgress'
import CouponSection from '@/features/cart/components/CouponSection'
import EmptyCart from '@/features/cart/components/EmptyCart'
import CartError from '@/features/cart/components/CartError'

const CartPage = () => {
  const { data: cartItems = [], isLoading, isError, refetch } = useCartHook()


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <CartError refetch={refetch} />
    )
  }

  if (cartItems.length === 0) {
    return (
      <EmptyCart />
    )
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );


  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-10 py-10 sm:py-16 font-jost">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <FreeShippingProgress total={subtotal} />
          <CartItemList items={cartItems} />
          <div className="mt-8 max-w-sm">
            <CouponSection />
          </div>
        </div>
        <aside className="lg:col-span-4">
          <CartSummary items={cartItems} />
        </aside>
      </div>
    </main>
  )
}

export default CartPage