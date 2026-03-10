"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/schema/loginSchema';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginSchemaType) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Login successful', data);

            // Additional login logic can go here
        } catch (error) {
            setSubmitError('Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-900/50">
                    <p className="text-sm font-medium text-red-800 dark:text-red-400">{submitError}</p>
                </div>
            )}

            <div className="space-y-5">
                <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email Address
                    </label>
                    <Input
                        id="username"
                        type="email"
                        placeholder="admin@company.com"
                        disabled={isSubmitting}
                        className={`h-11 transition-all ${errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        {...register('username')}
                    />
                    {errors.username && (
                        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">{errors.username.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Password
                        </label>
                        <a href="#" className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            disabled={isSubmitting}
                            className={`h-11 pr-10 transition-all ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            {...register('password')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-300 rounded-sm"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">{errors.password.message}</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 shadow-md transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
                <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                </div>
                {isSubmitting ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>Signing in...</span>
                    </>
                ) : (
                    <>
                        <span>Sign in</span>
                    </>
                )}
            </button>
        </form>
    );
}