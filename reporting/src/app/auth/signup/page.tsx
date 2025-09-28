// app/auth/signup/page.tsx
'use client';

import { HiMail, HiLockClosed, HiUser, HiArrowRight, HiOfficeBuilding, HiPhone } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual registration logic
      if (formData.name && formData.email && formData.password) {
        router.push('/auth/login?success=registered');
      } else {
        setError('Please fill in all required fields');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50 flex">
      {/* Left Side - Brand */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 to-blue-800 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/evasue4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/90 to-blue-800/90"></div>

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-5 text-sm text-pink-100 max-w-md mx-auto"
          >
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <HiUser className="w-6 h-6 text-pink-300" />
              <span>Create your leadership account</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <HiOfficeBuilding className="w-6 h-6 text-blue-300" />
              <span>Join the EvaSUE fellowship network</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <HiLockClosed className="w-6 h-6 text-green-300" />
              <span>Secure and private registration</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <HiUser className="w-6 h-6" />
                Create Account
              </h2>
              <p className="text-red-100 mt-1">Join the EvaSUE fellowship community</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiUser className="w-4 h-4 text-blue-600" /> Full Name *
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-10 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiMail className="w-4 h-4 text-blue-600" /> Email Address *
                </label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiPhone className="w-4 h-4 text-blue-600" /> Phone Number *
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 9XX XXX XXX"
                    required
                    className="w-full pl-10 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiOfficeBuilding className="w-4 h-4 text-blue-600" /> Organization *
                </label>
                <div className="relative">
                  <HiOfficeBuilding className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Your university or organization"
                    required
                    className="w-full pl-10 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiLockClosed className="w-4 h-4 text-blue-600" /> Password *
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <HiLockClosed className="w-4 h-4 text-blue-600" /> Confirm Password *
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-blue-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3.5 rounded-xl hover:from-sky-700 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Create Account
                    <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-200/50 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            By creating an account, you agree to EvaSUE’s{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}