// app/admin/components/AdminHeader.tsx
'use client';

import { HiBell, HiMenu, HiX, HiHome, HiUsers, HiClipboardList, HiChartBar, HiCalendar, HiLocationMarker, HiCog, HiShieldCheck, HiLogout } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const hasAlert = true;

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: HiHome },
  { name: 'Leaders', path: '/admin/leaders', icon: HiUsers },
  { name: 'Staff', path: '/admin/staff', icon: HiShieldCheck },
  { name: 'Reports', path: '/admin/reports', icon: HiClipboardList },
  { name: 'Events', path: '/admin/events', icon: HiCalendar },
  { name: 'Settings', path: '/admin/settings', icon: HiCog },
];

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white/90 backdrop-blur-md shadow-sm border-b border-red-200/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-gray-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
        >
          {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
        <div className="text-center flex-1">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-red-600 font-medium">Headquarters</p>
        </div>
        <div className="relative">
          <HiBell className="w-6 h-6 text-gray-600" />
          {hasAlert && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-white/90 backdrop-blur-md shadow-sm border-b border-red-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, HQ Team! ✨</h1>
          <p className="text-sm text-red-600 font-medium">National oversight & strategic leadership</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-red-50 rounded-full transition group">
            <HiBell className="w-6 h-6 group-hover:text-red-600 transition-colors" />
            {hasAlert && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-pink-600 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            A
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
          <div className="w-64 bg-gradient-to-b from-white to-pink-50/30 backdrop-blur-xl shadow-2xl border-r border-red-200/60 p-6 transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">NGO</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Admin Panel</h3>
                  <p className="text-xs text-red-600">Headquarters</p>
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
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`group flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200/60'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-red-600' : 'text-gray-500 group-hover:text-red-600'}`} />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-red-200/40">
              <button
                className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-gray-600 hover:text-red-600 font-medium rounded-xl hover:bg-red-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <HiLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}