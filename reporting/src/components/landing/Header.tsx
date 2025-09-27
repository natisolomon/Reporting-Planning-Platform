"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-xl border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          StudentConnect
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-800">
          <Link href="/features" className="hover:text-blue-600 transition">Features</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
          <Link href="/auth/login" className="hover:text-blue-600 transition">Login</Link>
        </nav>

        {/* Mobile nav toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/features">Features</Link>
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
