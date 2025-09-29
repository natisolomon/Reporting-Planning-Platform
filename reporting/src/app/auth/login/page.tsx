// app/auth/login/page.tsx
'use client';

import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ used for navigation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';

// --- Zod Schema ---
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter(); // ✅ initialize router

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ critical for cookies
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Login failed');
      }
      return json;
    },
    onSuccess: (data) => {
      // ✅ Role-based redirect using Next.js client-side navigation
      const redirectPaths: Record<string, string> = {
        leader: '/leader',
        staff: '/staff',
        supervisor: '/supervisor',
        admin: '/admin',
      };
      const path = redirectPaths[data.user?.role] || '/';
      router.push(path); // ✅ smooth SPA navigation (no full reload)
    },
    onError: (error: Error) => {
      console.error('Login error:', error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50 flex">
      {/* Left Side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
        style={{ 
          backgroundImage: "url('/evasue4.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundBlendMode: 'overlay' 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/90 to-blue-800/90"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-12 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="mb-8"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">ES</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">EvaSUE</h1>
            <p className="text-pink-100 text-xl">Fellowship in Christ, Growth in Truth</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.3 }} 
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <HiLockClosed className="w-6 h-6" />
                Welcome Back
              </h2>
              <p className="text-red-100 mt-1">Sign in to your EvaSUE account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiMail className="w-4 h-4 text-blue-600" /> Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiLockClosed className="w-4 h-4 text-blue-600" /> Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* API Error */}
              {mutation.isError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                  {(mutation.error as Error).message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {mutation.isPending ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-200/50 text-center">
              <p className="text-sm text-gray-600">
                Dont have an account?{' '}
                <Link 
                  href="/auth/signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}