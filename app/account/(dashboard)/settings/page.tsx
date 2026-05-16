"use client";

import ProfileForm from "@/features/accounts/components/ProfileForm";
import AddressForm from "@/features/accounts/components/AddressForm";
import PasswordForm from "@/features/accounts/components/PasswordForm";
import {
  ProfileSchemaType,
  AddressSchemaType,
} from "@/features/accounts/schema/accountSchema";
import { useCurrentUser } from "@/features/accounts/hooks/account.hooks";

export default function SettingsPage() {
  const { data, isLoading } = useCurrentUser();

  if (!data) return null;

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-12">
        <div className="h-64 bg-neutral-100"></div>
        <div className="h-64 bg-neutral-100"></div>
      </div>
    );
  }

  // Extract profile info (minus address) to match ProfileSchema structure
  const profileInfo: ProfileSchemaType = {
    name: `${data?.name}`,
    email: data.email,
    phone: data.phone,
  };

  const addressInfo: AddressSchemaType = {
    streetAddress: data.streetAddress || "",
    apartment: data.apartment || "",
    city: data.city || "",
    state: data.state || "",
    postalCode: data.postalCode || "",
    country: data.country || "",
  };

  return (
    <div className="space-y-12">
      <div className="border border-neutral-200 p-6 sm:p-8 bg-white">
        <ProfileForm initialData={profileInfo} />
      </div>

      <div className="border border-neutral-200 p-6 sm:p-8 bg-white">
        <AddressForm initialData={addressInfo} />
      </div>

      <div className="border border-neutral-200 p-6 sm:p-8 bg-white">
        <PasswordForm />
      </div>
    </div>
  );
}
