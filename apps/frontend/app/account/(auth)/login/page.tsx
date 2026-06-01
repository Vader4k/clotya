import UserLoginForm from "@/features/accounts/components/UserLoginForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account.",
};

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md pt-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-jost font-medium text-black">Sign In</h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <UserLoginForm />

                <div className="mt-6 text-center text-sm">
                    <span className="text-neutral-500">Don't have an account? </span>
                    <Link href="/account/register" className="font-medium text-black hover:underline underline-offset-4">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
}
