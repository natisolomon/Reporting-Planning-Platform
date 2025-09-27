"use client";

import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Welcome Back
        </h2>
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:bg-blue-800 transition"
          >
            <LogIn className="w-5 h-5" /> Log In
          </button>
        </form>

        {/* Extra */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-700 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </section>
  );
}
