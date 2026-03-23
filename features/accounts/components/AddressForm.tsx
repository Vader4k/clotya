"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressSchemaType } from "../schema/accountSchema";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { accountClientService } from "../services/account.client.service";
import { toast } from "sonner";

export default function AddressForm({ 
    initialData 
}: { 
    initialData?: AddressSchemaType 
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddressSchemaType>({
        resolver: zodResolver(addressSchema),
        defaultValues: initialData || {
            streetAddress: "",
            apartment: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        }
    });

    const onSubmit = async (data: AddressSchemaType) => {
        try {
            const res = await accountClientService.updateAddress(data);
            toast.success(res.message);
        } catch (err: any) {
            toast.error(err.message || "Failed to update address");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-medium text-black">Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-neutral-900">Street Address *</label>
                    <Input 
                        disabled={isSubmitting}
                        placeholder="House number and street name"
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.streetAddress && 'border-red-500'}`} 
                        {...register("streetAddress")} 
                    />
                    {errors.streetAddress && <p className="text-xs text-red-500">{errors.streetAddress.message}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-neutral-900">Apartment, suite, unit etc. (optional)</label>
                    <Input 
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.apartment && 'border-red-500'}`} 
                        {...register("apartment")} 
                    />
                    {errors.apartment && <p className="text-xs text-red-500">{errors.apartment.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Town / City *</label>
                    <Input 
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.city && 'border-red-500'}`} 
                        {...register("city")} 
                    />
                    {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">State / County *</label>
                    <Input 
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.state && 'border-red-500'}`} 
                        {...register("state")} 
                    />
                    {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Postcode / ZIP *</label>
                    <Input 
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.postalCode && 'border-red-500'}`} 
                        {...register("postalCode")} 
                    />
                    {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Country *</label>
                    <Input 
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.country && 'border-red-500'}`} 
                        {...register("country")} 
                    />
                    {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-70 rounded-none w-full md:w-auto"
            >
                {isSubmitting ? (
                    <><Loader2 className="size-4 animate-spin" /> Saving...</>
                ) : "Save Address"}
            </button>
        </form>
    );
}
