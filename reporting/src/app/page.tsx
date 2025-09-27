"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Animated heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          Empower Student Leaders <br />
          with <span className="text-gray-900">Premium Tools</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          A modern platform where student leaders and staff collaborate seamlessly,
          with reporting, support, and program planning — all in one place.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/auth/signup"
            className="group px-8 py-4 bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-800 transition"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </a>
          <a
            href="/features"
            className="px-8 py-4 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
