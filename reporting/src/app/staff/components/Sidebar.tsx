// app/staff/components/Sidebar.tsx
'use client';

import { HiHome, HiClipboardList, HiUsers, HiCalendar, HiChartBar, HiCog, HiLogout } from 'react-icons/hi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', path: '/staff', icon: HiHome },
  { name: 'Reports', path: '/staff/reports', icon: HiClipboardList },
  { name: 'Leaders', path: '/staff/leader', icon: HiUsers },
  { name: 'Events', path: '/staff/events', icon: HiCalendar },
  { name: 'Analytics', path: '/staff/analytics', icon: HiChartBar },
  { name: 'Settings', path: '/staff/settings', icon: HiCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gradient-to-b from-emerald-50 to-teal-50/30 backdrop-blur-xl border-r border-emerald-200/50 shadow-xl min-h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-emerald-200/40">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-emerald-300/30">
            <span className="text-white font-bold text-lg">FH</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">FellowshipHub</h1>
            <p className="text-sm text-emerald-700 font-medium">Staff Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`group flex items-center space-x-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 shadow-sm border border-emerald-200/60'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200/30'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-600"></div>
              )}
              
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${
                  isActive
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md'
                    : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 group-hover:text-emerald-700'
                }
              `}>
                <item.icon className="w-5 h-5" />
              </div>
              
              <span className="font-medium relative">
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-3 h-0.5 bg-emerald-500 rounded-full"></span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-emerald-200/40 mt-auto">
        <button className="group w-full flex items-center space-x-4 px-4 py-3.5 text-sm text-gray-700 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-200 transition-all duration-300">
            <HiLogout className="w-5 h-5" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}