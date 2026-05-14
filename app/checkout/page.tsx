"use client";

import BillingDetails from "@/features/checkout/components/BillingDetails";
import CouponHolder from "@/features/checkout/components/CouponHolder";
import CustomerChecker from "@/features/checkout/components/CustomerChecker";
import OrderDetail from "@/features/checkout/components/OrderDetail";
import {
  BillingDetailsType,
  billingDetailsSchema,
} from "@/features/checkout/schema/checkout.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkoutServices } from "@/features/checkout/services/checkout.service";
import { errorHandler } from "@/lib/http/errorHandler";
import { useCartHook, useClearCart } from "@/features/cart/hooks/cart.hook";
import CartError from "@/features/cart/components/CartError";
import EmptyCart from "@/features/cart/components/EmptyCart";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const { data: cartItems, isLoading, isError, refetch } = useCartHook();
  const { mutate: clearCart } = useClearCart();
  const [paying, setPaying] = useState(false);
  // TODO: think of a better ux for clear cart functionality
  const router = useRouter();

  const form = useForm<BillingDetailsType>({
    resolver: zodResolver(billingDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      notes: "",
      shipmentType: "standard",
      paymentType: "paystack",
    },
  });

  const { handleSubmit, trigger } = form;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return <CartError refetch={refetch} />;
  }

  if (!cartItems?.items || cartItems?.items.length === 0) {
    return <EmptyCart />;
  }

  const handleCheckout = async (data: BillingDetailsType) => {
    const valid = await trigger();

    if (!valid) {
      toast.error("Please fill in all the required fields");
      return false;
    }

    const orderItem = {
      ...data,
      items: cartItems.items,
      cartId: cartItems.cartId || null,
    };

    try {
      setPaying(true);
      const res = await checkoutServices.checkout(orderItem);
      if (!res.paymentUrl) {
        toast.success(res.message);
      } else {
        router.replace(res.paymentUrl);
      }
    } catch (error) {
      toast.error(errorHandler(error));
    } finally {
      setPaying(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 grid gap-7 sm:py-16 font-jost">
      <CustomerChecker />
      <CouponHolder />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="w-full flex items-start gap-6"
        >
          <div className="flex-5 w-full">
            <BillingDetails />
          </div>
          <div className="flex-[2.5] w-full">
            <OrderDetail cartItems={cartItems?.items} paying={paying}/>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default page;
