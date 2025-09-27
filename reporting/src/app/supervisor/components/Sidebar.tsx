// app/super-staff/components/Sidebar.tsx
'use client';

import { HiHome, HiClipboardList, HiUsers, HiChartBar, HiBell, HiCog, HiLogout } from 'react-icons/hi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/supervisor', icon: HiHome },
    { name: 'Reports', path: '/supervisor/reports', icon: HiClipboardList },
    { name: 'Leaders', path: '/supervisor/leaders', icon: HiUsers },
    { name: 'Analytics', path: '/supervisor/analytics', icon: HiChartBar },
    { name: 'Alerts', path: '/supervisor/alerts', icon: HiBell },
    { name: 'Settings', path: '/supervisor/settings', icon: HiCog },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gradient-to-b from-white to-indigo-50/30 backdrop-blur-xl border-r border-indigo-200/40 shadow-xl min-h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-indigo-200/40">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-indigo-300/30">
            <span className="text-white font-bold text-lg">CS1</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Super Staff</h1>
            <p className="text-sm text-indigo-700 font-medium">Central 1 Region</p>
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
              className={`group flex items-center space-x-4 px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 shadow-sm border border-indigo-200/60'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200/30'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-r-full"></div>
              )}
              
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${
                  isActive
                    ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md'
                    : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 group-hover:text-indigo-700'
                }
              `}>
                <item.icon className="w-5 h-5" />
              </div>
              
              <span className="font-medium relative">
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-3 h-0.5 bg-indigo-500 rounded-full"></span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-indigo-200/40 mt-auto">
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