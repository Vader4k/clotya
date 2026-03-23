"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordSchemaType } from "../schema/accountSchema";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { accountClientService } from "../services/account.client.service";
import { toast } from "sonner";

export default function PasswordForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PasswordSchemaType>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data: PasswordSchemaType) => {
        try {
            const res = await accountClientService.updatePassword(data);
            toast.success(res.message);
            reset();
        } catch (err: any) {
            toast.error(err.message || "Failed to change password");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-medium text-black">Password Change</h3>
            
            <div className="space-y-4 max-w-lg">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Current Password</label>
                    <Input 
                        type="password"
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.currentPassword && 'border-red-500'}`} 
                        {...register("currentPassword")} 
                    />
                    {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword.message}</p>}
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">New Password</label>
                    <Input 
                        type="password"
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.newPassword && 'border-red-500'}`} 
                        {...register("newPassword")} 
                    />
                    {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Confirm New Password</label>
                    <Input 
                        type="password"
                        disabled={isSubmitting}
                        className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.confirmPassword && 'border-red-500'}`} 
                        {...register("confirmPassword")} 
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-70 rounded-none w-full md:w-auto"
            >
                {isSubmitting ? (
                    <><Loader2 className="size-4 animate-spin" /> Updating...</>
                ) : "Change Password"}
            </button>
        </form>
    );
}
