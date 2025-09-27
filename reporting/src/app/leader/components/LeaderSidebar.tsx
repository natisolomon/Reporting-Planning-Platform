// app/leader/components/LeaderSidebar.tsx

'use client';

import { HiHome, HiClipboardList, HiChat, HiCalendar, HiCog, HiLogout } from 'react-icons/hi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', path: '/leader', icon: HiHome },
  { name: 'Submit Report', path: '/leader/submit-report', icon: HiClipboardList },
  { name: 'My Reports', path: '/leader/my-reports', icon: HiChat },
  { name: 'Events', path: '/leader/events', icon: HiCalendar },
  { name: 'Settings', path: '/leader/settings', icon: HiCog },
];

export default function LeaderSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200/60 min-h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">ES</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Campus Leader</h1>
            <p className="text-xs text-gray-500">Unity University</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 
                ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-yellow-800 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
                transform hover:scale-102 hover:shadow-md`
              }
            >
              <div className={`
                w-8 h-8 rounded-xl flex items-center justify-center text-lg
                ${
                  isActive
                    ? 'bg-orange-400 text-white shadow-lg'
                    : 'bg-orange-100 text-orange-400 group-hover:bg-orange-200 group-hover:text-orange-600'
                }
                transition-all duration-300
              `}>
                <item.icon />
              </div>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200/50">
        <button className="group w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-200 transition">
            <HiLogout className="w-5 h-5" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}