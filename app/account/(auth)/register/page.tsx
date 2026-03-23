import UserRegisterForm from "@/features/accounts/components/UserRegisterForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Sign up for a new account.",
};

export default function RegisterPage() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md pt-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-jost font-medium text-black">Create Account</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Join us to keep track of your orders and save items.
                    </p>
                </div>

                <UserRegisterForm />

                <div className="mt-6 text-center text-sm">
                    <span className="text-neutral-500">Already have an account? </span>
                    <Link href="/account/login" className="font-medium text-black hover:underline underline-offset-4">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
