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
    <aside className="hidden md:flex md:flex-col w-64 bg-white/95 backdrop-blur-md shadow-xl border-r border-sky-100 min-h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-sky-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-sky-800 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">FH</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">FellowshipHub</h1>
            <p className="text-xs text-sky-600 font-medium">Campus Leader</p>
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
              className={`group flex items-center space-x-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative
                ${
                  isActive
                    ? 'text-sky-700 bg-sky-50'
                    : 'text-gray-600 hover:text-sky-700 hover:bg-sky-50'
                }
                hover:shadow-sm`
              }
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-600 to-sky-800 rounded-r-full"></div>
              )}
              
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300
                ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-sky-100 text-sky-600 group-hover:bg-sky-200 group-hover:text-sky-700'
                }
              `}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-sky-100 mt-auto">
        <button className="group w-full flex items-center space-x-4 px-4 py-3.5 text-sm text-gray-600 hover:text-sky-700 transition-all duration-300 rounded-xl hover:bg-sky-50">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-200 group-hover:text-sky-700 transition-all duration-300">
            <HiLogout className="w-5 h-5" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}