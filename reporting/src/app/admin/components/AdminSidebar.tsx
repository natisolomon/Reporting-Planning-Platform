// app/admin/components/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiHome,
  HiUsers,
  HiClipboardList,
  HiCog,
  HiBriefcase,
  HiShieldCheck,
  HiUserGroup
} from 'react-icons/hi';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: HiHome },
  { name: 'Leaders', path: '/admin/leaders', icon: HiUserGroup },
  { name: 'Staff', path: '/admin/staff', icon: HiUsers },
  { name: 'Events', path: '/admin/events', icon: HiBriefcase },
  { name: 'Reports', path: '/admin/reports', icon: HiClipboardList },
  { name: 'Settings', path: '/admin/settings', icon: HiCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gradient-to-b from-white to-blue-50/30 backdrop-blur-xl border-r border-blue-200/40 shadow-xl min-h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-blue-200/40">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-blue-300/30">
            <span className="text-white font-bold text-lg">NGO</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-blue-700 font-medium">System Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`group flex items-center space-x-4 px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                active
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 shadow-sm border border-blue-200/60'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200/30'
              }`}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full"></div>
              )}
              
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${
                  active
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md'
                    : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700'
                }
              `}>
                <item.icon className="w-5 h-5" />
              </div>
              
              <span className="font-medium relative">
                {item.name}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-3 h-0.5 bg-blue-500 rounded-full"></span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-red-200/40 mt-auto">
        <button className="group w-full flex items-center space-x-4 px-4 py-3.5 text-sm text-gray-700 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-200 transition-all duration-300">
            <HiShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}