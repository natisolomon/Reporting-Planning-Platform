// app/staff/dashboard/page.tsx
'use client';

import { 
  HiClipboardList, HiCalendar, HiUserCircle, 
  HiBell, HiSparkles, HiArrowRight, HiChartBar 
} from 'react-icons/hi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Banner from './components/Banner';

export default function Staff() {
  const campus = "Unity University";
  const region = "Piassa Region";
  const pendingActions = 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Banner with Linear Gradient */}
        <Banner 
          campus={campus}
          region={region}
          reportsCount={12}
          status="Active"
          delay={0}
        />

        {/* Action Cards */}
        <div className="space-y-6">
          {/* Submit Report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/staff/reports"
              className="block group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <HiClipboardList className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Manage Reports</h3>
                      <p className="text-gray-600 mt-1">Review and respond to campus leader reports</p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Leaders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/staff/leaders"
              className="block group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-300 hover:border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                      <HiUserCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Campus Leaders</h3>
                      <p className="text-gray-600 mt-1">Manage and support student leaders</p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/staff/events"
              className="block group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-300 hover:border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                      <HiCalendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Events</h3>
                      <p className="text-gray-600 mt-1">Plan and organize fellowship events</p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/staff/analytics"
              className="block group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-300 hover:border-indigo-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                      <HiChartBar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                      <p className="text-gray-600 mt-1">Track your impact and fellowship growth</p>
                    </div>
                  </div>
                  <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Upcoming Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200"
          >
            <div className="flex items-start">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <HiCalendar className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Leadership Workshop</h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                    Upcoming
                  </span>
                </div>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">May 10, 2025</span> • Student Center, Unity University
                </p>
                <button className="mt-4 text-emerald-700 font-medium text-sm hover:text-emerald-800 flex items-center">
                  View Details
                  <HiArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action Required */}
          {pendingActions > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
            >
              <div className="flex items-start">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <HiBell className="w-6 h-6 text-amber-700" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Action Required</h3>
                  <p className="text-gray-700 mt-2">
                    {pendingActions} pending response{pendingActions > 1 ? 's' : ''} from campus leaders
                  </p>
                  <button className="mt-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                    Respond Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Motivation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl border border-violet-200 text-center"
        >
          <HiSparkles className="w-8 h-8 text-violet-500 mx-auto mb-3" />
          <p className="text-violet-700 font-medium">
            You re making a difference — keep leading with courage. 💙
          </p>
        </motion.div>
      </main>
    </div>
  );
}