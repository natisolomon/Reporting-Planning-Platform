'use client';

import { HiMail, HiLockClosed, HiUser, HiArrowRight, HiOfficeBuilding, HiPhone } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';

// --- Zod schema ---
const signupSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['leader', 'staff', 'supervisor', 'admin']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Registration failed');
      return json;
    },
    onSuccess: () => router.push('/auth/login/?success=registered'),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50 flex">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 to-blue-800 text-white relative overflow-hidden"
           style={{ backgroundImage: "url('/evasue4.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/90 to-blue-800/90"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-12 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-white font-bold text-2xl">ES</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">EvaSUE</h1>
            <p className="text-pink-100 text-xl">Fellowship in Christ, Growth in Truth</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <HiUser className="w-6 h-6" />
                Create Account
              </h2>
              <p className="text-red-100 mt-1">Join the EvaSUE fellowship community</p>
            </div>

            <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiUser className="w-4 h-4 text-blue-600" /> Full Name *
                </label>
                <input {...register('name')} placeholder="Enter full name" className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiMail className="w-4 h-4 text-blue-600" /> Email *
                </label>
                <input {...register('email')} placeholder="you@example.com" type="email" className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiPhone className="w-4 h-4 text-blue-600" /> Phone *
                </label>
                <input {...register('phone')} placeholder="+251 9XX XXX XXX" className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiLockClosed className="w-4 h-4 text-blue-600" /> Password *
                </label>
                <input {...register('password')} placeholder="••••••••" type="password" className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiLockClosed className="w-4 h-4 text-blue-600" /> Confirm Password *
                </label>
                <input {...register('confirmPassword')} placeholder="••••••••" type="password" className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiOfficeBuilding className="w-4 h-4 text-blue-600" /> Role *
                </label>
                <select {...register('role')} className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="leader">Leader</option>
                  <option value="staff">Staff</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {mutation.isPending ? 'Registering...' : <>
                  Create Account <HiArrowRight className="w-5 h-5"/>
                </>}
              </motion.button>

              {mutation.status === 'error' && (
                <p className="text-red-500 text-sm">{(mutation.error as Error).message}</p>
              )}
            </form>

            <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-200/50 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
