// app/staff/components/Header.tsx

'use client';

import { HiBell, HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';

const hasAlert = true;

// Reusable menu items
const menuItems = [
  { name: 'Dashboard', path: '/staff/dashboard' },
  { name: 'Reports', path: '/staff/reports' },
  { name: 'Leaders', path: '/staff/leaders' },
  { name: 'Events', path: '/staff/events' },
  { name: 'Analytics', path: '/staff/analytics' },
  { name: 'Settings', path: '/staff/settings' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 p-2"
        >
          {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>

        <div className="text-center flex-1">
          <h2 className="text-lg font-semibold text-gray-800">Staff</h2>
          <p className="text-xs text-gray-500">Piassa Cluster</p>
        </div>

        <div className="relative">
          <HiBell className="w-6 h-6 text-gray-600" />
          {hasAlert && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, Daniel! ✨</h1>
          <p className="text-sm text-gray-600">Managing 5 campuses in Piassa</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
            <HiBell className="w-6 h-6" />
            {hasAlert && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            D
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex animate-fadeIn">
          {/* Sidebar */}
          <div className="w-48 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200/60 p-4 space-y-2">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 text-sm">Menu</h3>
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl mt-4 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Logout
            </button>
          </div>
          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}