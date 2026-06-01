import LoginForm from "@/features/auth/components/LoginForm";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure login for the Clotya Admin Portal. Access platform management and operation tools.",
  robots: {
    index: false,
    follow: false,
  }
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Left side panel - Visual */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-neutral-900 p-12 lg:flex">
                {/* Background Pattern/Gradient */}
                <div className="absolute inset-0 z-0 bg-linear-to-br from-neutral-800/50 via-neutral-900 to-black mix-blend-multiply" />
                <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-neutral-400" />
                        <span className="text-xl font-bold text-white tracking-tight">Admin<span className="text-neutral-400">Portal</span></span>
                    </div>
                </div>

                <div className="relative z-10">
                    <blockquote className="space-y-2">
                        <p className="text-3xl font-medium tracking-tight text-white max-w-lg mb-6 leading-tight">
                            "Securely manage your platform, track metrics, and oversee operations all in one unified dashboard."
                        </p>
                        <footer className="text-sm text-neutral-400">
                            Version 2.0 &bull; Enterprise Edition
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right side panel - Form */}
            <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-12 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="flex justify-center mb-8 lg:hidden">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8 text-neutral-900 dark:text-neutral-100" />
                            <span className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Admin<span className="text-neutral-500 dark:text-neutral-400">Portal</span></span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Welcome back</h1>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                            Enter your credentials to access the admin portal.
                        </p>
                    </div>

                    <LoginForm />

                    <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                        Protected by enterprise-grade security. <br className="hidden sm:block" />
                        Having trouble logging in? <a href="#" className="font-medium hover:text-neutral-900 dark:hover:text-white underline underline-offset-4">Contact IT Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}