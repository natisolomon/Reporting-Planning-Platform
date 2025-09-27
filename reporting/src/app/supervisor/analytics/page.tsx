// app/super-staff/analytics/page.tsx
'use client';

import { useState } from 'react';
import { 
  HiUserGroup, HiClipboardList, HiChartBar, HiLocationMarker, 
  HiTrendingUp, HiSearch, HiArrowUp 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const stats = [
  { label: 'Total Reports', value: '142', icon: HiClipboardList, color: 'from-blue-500 to-indigo-600' },
  { label: 'Active Leaders', value: '48', icon: HiUserGroup, color: 'from-green-500 to-emerald-600' },
  { label: 'Campuses', value: '52', icon: HiLocationMarker, color: 'from-indigo-500 to-purple-600' },
  { label: 'Avg. Response Time', value: '6.2h', icon: HiChartBar, color: 'from-purple-500 to-pink-600' },
];

const reportTrends = [
  { week: 'Apr 1–7', count: 18 },
  { week: 'Apr 8–14', count: 22 },
  { week: 'Apr 15–21', count: 31 },
  { week: 'Apr 22–28', count: 29 },
  { week: 'Apr 29–May 5', count: 42 },
];

const categoryBreakdown = [
  { name: 'Academic', count: 58, color: 'bg-blue-500', gradient: 'from-blue-500 to-indigo-600' },
  { name: 'Need', count: 36, color: 'bg-red-500', gradient: 'from-red-500 to-orange-600' },
  { name: 'Fellowship', count: 28, color: 'bg-green-500', gradient: 'from-green-500 to-emerald-600' },
  { name: 'Event', count: 20, color: 'bg-yellow-500', gradient: 'from-yellow-500 to-amber-600' },
];

const subRegionEngagement = [
  { name: 'Piassa', reports: 48, leaders: 17 },
  { name: 'Mexico', reports: 32, leaders: 14 },
  { name: 'Phawulos', reports: 62, leaders: 17 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const maxReports = Math.max(...subRegionEngagement.map(r => r.reports));

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Insights across Central 1 Region</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['week', 'month', 'quarter'].map((range) => (
                <motion.button
                  key={range}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === range
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </motion.button>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <HiArrowUp className="w-5 h-5 animate-spin" />
              ) : (
                <HiArrowUp className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HiTrendingUp className="w-5 h-5 text-indigo-600" />
                Weekly Report Volume
              </h3>
              <span className="text-sm text-gray-500 capitalize">{timeRange}</span>
            </div>
            
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {reportTrends.map((week, index) => (
                  <motion.div
                    key={week.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center"
                  >
                    <div className="w-24 text-sm font-medium text-gray-600 min-w-[6rem]">
                      {week.week}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Reports</span>
                        <span className="text-xs font-medium text-gray-800">{week.count}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(week.count / 45) * 100}%` }}
                          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HiChartBar className="w-5 h-5 text-green-600" />
                Report Categories
              </h3>
            </div>
            
            <div className="space-y-5">
              {categoryBreakdown.map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 ${cat.color} rounded-full`}></div>
                      <span className="font-medium text-gray-700">{cat.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{cat.count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.count / 58) * 100}%` }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${cat.gradient} rounded-full shadow-sm`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sub-Region Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <HiLocationMarker className="w-5 h-5 text-purple-600" />
              Sub-Region Engagement
            </h3>
            <span className="text-sm text-gray-500">Leaders & Reports</span>
          </div>
          
          <div className="space-y-8">
            {subRegionEngagement.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-bold text-gray-800">{region.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-indigo-600 font-medium">{region.reports} reports</span>
                    <span className="text-green-600 font-medium">{region.leaders} leaders</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(region.reports / maxReports) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-sm"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}