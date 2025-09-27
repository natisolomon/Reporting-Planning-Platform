// app/staff/dashboard/components/Banner.tsx
'use client';

import { useEffect, useState } from 'react';
import { HiClipboardList, HiCheck } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface BannerProps {
  campus: string;
  region: string;
  reportsCount: number;
  status: string;
  delay?: number;
}

export default function Banner({ 
  campus, 
  region, 
  reportsCount, 
  status, 
  delay = 0 
}: BannerProps) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-8 text-white shadow-xl mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Welcome Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{greeting}, Staff!</h2>
          <p className="text-blue-100 flex items-center text-lg">
            <span className="font-medium">{campus}</span>
            <span className="mx-2 text-blue-200">•</span>
            <span>{region}</span>
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Reports Submitted */}
          <div className="flex items-center space-x-4 min-w-[200px]">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <HiClipboardList className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-100 uppercase tracking-wide">Reports</p>
              <p className="text-lg font-semibold">{reportsCount} Submitted</p>
            </div>
          </div>

          {/* Leadership Status */}
          <div className="flex items-center space-x-4 min-w-[200px]">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <HiCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-100 uppercase tracking-wide">Status</p>
              <p className="text-lg font-semibold text-emerald-300">{status}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}