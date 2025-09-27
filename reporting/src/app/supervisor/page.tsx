// app/super-staff/dashboard/page.tsx
'use client';

import { motion } from 'framer-motion';
import { HiAcademicCap, HiUser, HiExclamation, HiBell, HiTrendingUp, HiLocationMarker } from 'react-icons/hi';

// Define TypeScript interface for stats
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay?: number;
}

// Mock Stats
const stats: StatCardProps[] = [
  { label: 'Total Campuses', value: '52', icon: HiAcademicCap, color: 'from-blue-500 to-indigo-600' },
  { label: 'Active Leaders', value: '48', icon: HiUser, color: 'from-green-500 to-emerald-600' },
  { label: 'Urgent Reports', value: '3', icon: HiExclamation, color: 'from-red-500 to-orange-600' },
  { label: 'High Priority', value: '7', icon: HiBell, color: 'from-orange-500 to-amber-600' },
];

const recentReports = [
  { id: 1, campus: 'Unity University', subRegion: 'Piassa', issue: 'Exam stress rising', priority: 'urgent', time: '2h ago' },
  { id: 2, campus: 'St. Joseph College', subRegion: 'Mexico', issue: 'Need fellowship materials', priority: 'high', time: '5h ago' },
  { id: 3, campus: 'Bethel College', subRegion: 'Phawulos', issue: 'Event feedback submitted', priority: 'low', time: '1d ago' },
];

const campusStatus = [
  { name: 'Piassa Region', total: 18, active: 17, urgent: 2 },
  { name: 'Mexico Region', total: 14, active: 14, urgent: 1 },
  { name: 'Phawulos Region', total: 20, active: 17, urgent: 0 },
];

// Modern Stat Card Component
function StatCard({ label, value, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Supervisor Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of Central 1 Region activities</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HiTrendingUp className="w-5 h-5 text-indigo-600" />
                Recent Reports
              </h3>
              <span className="text-sm text-gray-500">Last 24 hours</span>
            </div>
            
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start p-4 border border-gray-100 rounded-xl hover:shadow-md transition group"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 mr-4 ${
                      report.priority === 'urgent'
                        ? 'bg-red-500'
                        : report.priority === 'high'
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{report.campus}</p>
                      <span className="text-xs text-gray-500">{report.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{report.issue}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <HiLocationMarker className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{report.subRegion}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sub-Region Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HiLocationMarker className="w-5 h-5 text-purple-600" />
                Sub-Region Overview
              </h3>
            </div>
            
            <div className="space-y-6">
              {campusStatus.map((region, index) => {
                const progress = (region.active / region.total) * 100;
                return (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-800">{region.name}</span>
                      <span className="text-gray-600">{region.active}/{region.total} active</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          region.urgent > 0
                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                        }`}
                      />
                    </div>
                    {region.urgent > 0 && (
                      <div className="flex items-center mt-2">
                        <HiExclamation className="w-3 h-3 text-red-500 mr-1" />
                        <span className="text-xs text-red-600 font-medium">{region.urgent} urgent issues</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}