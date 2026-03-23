"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/features/accounts/components/ProfileForm";
import AddressForm from "@/features/accounts/components/AddressForm";
import PasswordForm from "@/features/accounts/components/PasswordForm";
import { accountClientService } from "@/features/accounts/services/account.client.service";
import { ProfileSchemaType, AddressSchemaType } from "@/features/accounts/schema/accountSchema";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await accountClientService.getProfile();
            setUser(data);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div className="animate-pulse space-y-12">
            <div className="h-64 bg-neutral-100"></div>
            <div className="h-64 bg-neutral-100"></div>
        </div>;
    }

    // Extract profile info (minus address) to match ProfileSchema structure
    const profileInfo: ProfileSchemaType = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
    };

    const addressInfo: AddressSchemaType = user.address;

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
