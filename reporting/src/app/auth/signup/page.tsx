

"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Create Account
        </h2>
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
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
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              required
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="staff">Staff</option>
              <option value="student-leader">Student Leader</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-700 text-white rounded-lg font-semibold shadow-md hover:bg-purple-800 transition"
          >
            <UserPlus className="w-5 h-5" /> Sign Up
          </button>
        </form>

        {/* Extra */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/auth/login" className="text-purple-700 hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </section>
  );
}
