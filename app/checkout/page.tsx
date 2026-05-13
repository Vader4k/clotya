'use client'

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

const page = () => {
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
      paymentType: "bank_transfer",
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const handleCheckout = async(data: BillingDetailsType) => {
    const valid = await trigger()

    if(!valid) {
      toast.error("Please fill in all the required fields")
      return false
    }

    console.log(data)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 grid gap-7 sm:py-16 font-jost">
      <CustomerChecker />
      <CouponHolder />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleCheckout)} className="w-full flex items-start gap-6">
          <div className="flex-5 w-full">
            <BillingDetails />
          </div>
          <div className="flex-[2.5] w-full">
            <OrderDetail />
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default page;
