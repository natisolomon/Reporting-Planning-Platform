// app/leader/components/LeaderHeader.tsx
'use client';

import { HiBell, HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';

// For demo: you can connect to real data later
const hasAlert = true;

export default function LeaderHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition"
          aria-label="Toggle menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>

        <div className="text-center flex-1">
          <h2 className="text-lg font-semibold text-gray-800">Campus Leader</h2>
          <p className="text-xs text-gray-500">Unity University</p>
        </div>

        <div className="relative">
          <HiBell className="w-6 h-6 text-gray-600" />
          {hasAlert && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          )}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, Meron!</h1>
          <p className="text-sm text-gray-600">Unity University • Piassa Region</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition group">
            <HiBell className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {hasAlert && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            )}
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            M
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="w-64 bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-200/60 p-6 transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Meron</h3>
                  <p className="text-xs text-gray-500">Campus Leader</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {[
                { name: 'Dashboard', path: '/leader' },
                { name: 'Submit Report', path: '/leader/submit-report' },
                { name: 'My Reports', path: '/leader/my-reports' },
                { name: 'Events', path: '/leader/events' },
                { name: 'Settings', path: '/leader/settings' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="group flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-2 h-2 bg-transparent group-hover:bg-indigo-500 rounded-full transition-all duration-200"></div>
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                className="w-full text-left px-3 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 mt-6"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}