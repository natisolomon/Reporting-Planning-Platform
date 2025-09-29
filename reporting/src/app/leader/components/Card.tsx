// app/leader/dashboard/components/Card.tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { HiClipboardList, HiCheck } from 'react-icons/hi'

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Banner Card for Welcome Section
interface BannerCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BannerCard({ children, className = '', delay = 0 }: BannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl p-8 border border-sky-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Status Card with Icon
interface StatusCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  color?: 'blue' | 'emerald' | 'amber' | 'red' | 'indigo';
  delay?: number;
}

export function StatusCard({ icon, title, value, color = 'blue', delay = 0 }: StatusCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Action Card with Arrow
interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  color?: 'indigo' | 'blue' | 'emerald' | 'amber';
  delay?: number;
}

export function ActionCard({ icon, title, description, href, color = 'indigo', delay = 0 }: ActionCardProps) {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-50',
      hoverBg: 'group-hover:bg-indigo-100',
      text: 'text-indigo-600',
      hoverText: 'group-hover:text-indigo-600'
    },
    blue: {
      bg: 'bg-blue-50',
      hoverBg: 'group-hover:bg-blue-100',
      text: 'text-blue-600',
      hoverText: 'group-hover:text-blue-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      hoverBg: 'group-hover:bg-emerald-100',
      text: 'text-emerald-600',
      hoverText: 'group-hover:text-emerald-600'
    },
    amber: {
      bg: 'bg-amber-50',
      hoverBg: 'group-hover:bg-amber-100',
      text: 'text-amber-600',
      hoverText: 'group-hover:text-amber-600'
    }
  };

  const classes = colorClasses[color];

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="block group"
    >
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-xl ${classes.bg} ${classes.hoverBg} transition-colors`}>
              {icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 ${classes.hoverText} transition-colors`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

// app/leader/dashboard/components/Card.tsx

// Updated NotificationCard with proper types
interface NotificationCardProps {
  icon: ReactNode;
  title: string;
  description: string | ReactNode; // Accept both string and React elements
  children?: ReactNode;
  color?: 'emerald' | 'amber' | 'red' | 'indigo'; // Added 'indigo' option
  delay?: number;
}

export function NotificationCard({ 
  icon, 
  title, 
  description, 
  children, 
  color = 'emerald', 
  delay = 0 
}: NotificationCardProps) {
  const bgColors = {
    emerald: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200',
    amber: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200',
    red: 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200',
    indigo: 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200' // Added indigo
  };

  const iconColors = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    indigo: 'bg-indigo-100 text-indigo-700' // Added indigo
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl p-6 border ${bgColors[color]}`}
    >
      <div className="flex items-start">
        <div className={`p-3 rounded-xl ${iconColors[color]}`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="text-gray-700 mt-2">
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </motion.div>
  );
}

// Modern Dashboard Banner - Contains both stats in one card
interface DashboardBannerProps {
  lastReport: string;
  fellowshipStatus: string;
  campus: string;
  region: string;
  delay?: number;
}

export function DashboardBanner({ 
  lastReport, 
  fellowshipStatus, 
  campus, 
  region, 
  delay = 0 
}: DashboardBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 rounded-2xl p-6 shadow-sm border border-gray-200/60 backdrop-blur-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section - Welcome & Location */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">Good morning, Leader!</h2>
          <p className="text-white/80 mt-1 flex items-center">
            <span className="font-medium">{campus}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span>{region}</span>
          </p>
        </div>

        {/* Right Section - Stats */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
          {/* Last Report */}
          <div className="flex items-center space-x-3 min-w-[180px]">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <HiClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-white uppercase tracking-wide">Last Report</p>
              <p className="text-sm font-semibold text-white/90">{lastReport}</p>
            </div>
          </div>

          {/* Fellowship Status */}
          <div className="flex items-center space-x-3 min-w-[180px]">
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <HiCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-white uppercase tracking-wide">Status</p>
              <p className="text-sm font-semibold text-green-500">{fellowshipStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}