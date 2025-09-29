// app/components/landing/Header.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { HiHeart, HiFilm, HiMenu, HiX } from 'react-icons/hi';

export default function LandingHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Open immediately on hover (desktop)
  const handleMouseEnter = (name: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenDropdown(name);
  };

  // Delayed close with buffer
  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  // Toggle dropdown on click (for mobile)
  const handleMobileClick = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Close mobile menu when link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">ES</span>
          </div>
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-sky-800 transition">
            EvaSUE
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
      
          <Link
            href="/videos"
            className="flex items-center gap-1 text-gray-700 hover:text-sky-600 transition font-medium"
          >
             About
          </Link>

          <Link
            href="/videos"
            className="flex items-center gap-1 text-gray-700 hover:text-sky-600 transition font-medium"
          >
            contact
          </Link>

          <Link
            href="/auth/login"
            className="bg-sky-600 text-white px-5 py-2 rounded-xl hover:bg-sky-700 transition flex items-center gap-1 text-sm font-medium shadow-lg hover:shadow-xl"
          >
            Login <span className="text-lg">→</span>
          </Link>
          
        </nav>

        {/* Desktop Buttons */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200/50 animate-fadeIn">
          <nav className="flex flex-col px-6 py-4 space-y-6">
      
            <Link
              href="/about"
              className="text-gray-700 font-medium flex items-center gap-1"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              href="/videos"
              className="text-gray-700 font-medium flex items-center gap-1"
              onClick={closeMenu}
            >
              Contact
            </Link>

            {/* Mobile Buttons */}
            <div className="flex flex-col space-y-3 pt-2 border-t border-gray-200">
            
          
          {/* Login Button */}
          <Link
            href="/auth/login"
            className="bg-sky-600 text-white px-5 py-2 rounded-xl hover:bg-sky-700 transition flex items-center gap-1 text-sm font-medium shadow-lg hover:shadow-xl"
          >
            Login <span className="text-lg">→</span>
          </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}