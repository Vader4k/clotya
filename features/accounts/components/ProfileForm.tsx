"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchemaType } from "../schema/accountSchema";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { accountClientService } from "../services/account.client.service";
import { toast } from "sonner";

export default function ProfileForm({
  initialData,
}: {
  initialData?: ProfileSchemaType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ProfileSchemaType) => {
    try {
      const res = await accountClientService.updateProfile(data);
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-medium text-black">Account Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900">
            Name
          </label>
          <Input
            disabled={isSubmitting}
            className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.name && "border-red-500"}`}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900">
            Email Address
          </label>
          <Input
            type="email"
            disabled={isSubmitting}
            className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.email && "border-red-500"}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-900">
            Phone (Optional)
          </label>
          <Input
            disabled={isSubmitting}
            className={`rounded-none border-neutral-300 focus-visible:ring-black h-11 ${errors.phone && "border-red-500"}`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-70 rounded-none w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}
