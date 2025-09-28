// app/admin/dashboard/page.tsx
'use client';

import {
  HiHome,
  HiUsers,
  HiClipboardList,
  HiChartBar,
  HiCalendar,
  HiDocumentReport,
  HiExclamation,
  HiCheckCircle,
  HiLocationMarker,
  HiFire,
  HiTrendingUp,
  HiDownload,
  HiPlus
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock Data
const stats = [
  { label: 'Regions', value: '6', icon: HiLocationMarker, color: 'from-red-500 to-pink-600', change: '+1' },
  { label: 'Staff', value: '24', icon: HiUsers, color: 'from-blue-500 to-indigo-600', change: '0' },
  { label: 'Leaders', value: '152', icon: HiUsers, color: 'from-emerald-500 to-teal-600', change: '+8' },
  { label: 'Active Reports', value: '47', icon: HiClipboardList, color: 'from-amber-500 to-orange-500', change: '+12' },
];

const recentReports = [
  { id: 1, campus: 'Unity University', issue: 'Exam stress rising', priority: 'urgent', time: '2h ago', region: 'Central 1' },
  { id: 2, campus: 'St. Joseph College', issue: 'Need fellowship materials', priority: 'high', time: '5h ago', region: 'Mexico' },
  { id: 3, campus: 'Bethel College', issue: 'Monthly meeting held', priority: 'low', time: '1d ago', region: 'Phawulos' },
];

const regionalEngagement = [
  { region: 'Central 1', reports: 48, leaders: 48, status: 'high' },
  { region: 'South', reports: 32, leaders: 30, status: 'medium' },
  { region: 'North', reports: 18, leaders: 16, status: 'medium' },
  { region: 'South West', reports: 29, leaders: 28, status: 'high' },
];

export default function AdminDashboard() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HiHome className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">National command center • Last updated: {time}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:from-red-700 hover:to-pink-700 transition text-sm font-medium shadow-lg hover:shadow-xl"
            >
              <HiDownload className="w-4 h-4" />
              Export Report
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
                  {stat.change && (
                    <span
                      className={`text-xs font-medium flex items-center gap-1 mt-1 ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      <HiTrendingUp className="w-3 h-3" />
                      {stat.change.startsWith('+') ? '+' : ''}{stat.change} vs last week
                    </span>
                  )}
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
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
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HiClipboardList className="w-5 h-5 text-amber-600" />
                Recent Reports
              </h2>
              <span className="text-sm text-gray-500">{recentReports.length} new</span>
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
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {report.region}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Regional Engagement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HiChartBar className="w-5 h-5 text-indigo-600" />
                Regional Pulse
              </h2>
            </div>
            
            <div className="space-y-6">
              {regionalEngagement.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-800">{region.region}</span>
                    <span className="text-gray-600">{region.reports} reports</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(region.reports / 50) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        region.status === 'high'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                          : 'bg-gradient-to-r from-amber-400 to-orange-500'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{region.leaders} leaders active</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <HiDocumentReport className="w-4 h-4 text-blue-600" />
                <span>
                  <strong>Weekly Report</strong> ready for review
                </span>
              </div>
              <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                View Summary
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link
            href="/admin/staff"
            className="block group"
          >
            <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
            >
              <HiUsers className="w-8 h-8 text-red-600 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Staff</h3>
              <p className="text-gray-600 text-sm">Assign, edit, and oversee regional leaders</p>
            </div>
          </Link>

          <Link
            href="/admin/reports"
            className="block group"
          >
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
            >
              <HiClipboardList className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Reports</h3>
              <p className="text-gray-600 text-sm">Filter, respond, and escalate issues</p>
            </div>
          </Link>

          <Link
            href="/admin/analytics"
            className="block group"
          >
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
            >
              <HiChartBar className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">View trends, impact, and engagement</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}