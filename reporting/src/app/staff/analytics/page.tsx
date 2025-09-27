// app/staff/analytics/page.tsx
'use client';

import { useState } from 'react';
import { 
  HiChartBar, HiClipboardList, HiUserGroup, HiTrendingUp, HiStar, HiArrowUp, HiCheckCircle 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type WeeklyData = {
  type: 'week';
  week: string;
  reports: number;
  engagement: number;
};

type MonthlyData = {
  type: 'month';
  month: string;
  reports: number;
  engagement: number;
};


export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for charts
  const weeklyData = [
    { type: 'week', week: 'Apr 1', reports: 5, engagement: 50 },
    { type: 'week', week: 'Apr 8', reports: 7, engagement: 70 },
    { type: 'week', week: 'Apr 1', reports: 3, engagement: 30 },
    { type: 'week', week: 'Apr 8', reports: 7, engagement: 70 },
    { type: 'week', week: 'Apr 15', reports: 9, engagement: 85 },
  ];

  const monthlyData = [
    { type: 'month', month: 'Jan', reports: 18, engagement: 65 },
    { type: 'month', month: 'Feb', reports: 22, engagement: 72 },
    { type: 'month', month: 'Mar', reports: 28, engagement: 80 },
    { type: 'month', month: 'Apr', reports: 42, engagement: 95 }
  ];

  const currentData = timeRange === 'month' ? monthlyData : weeklyData;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link 
                href="/staff/dashboard" 
                className="text-emerald-600 text-sm font-medium mb-4 inline-flex items-center gap-1 hover:text-emerald-700 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-xl p-1">
                {['week', 'month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            icon={<HiClipboardList className="w-6 h-6 text-white" />}
            title="Reports Submitted"
            value="42"
            change="+12% from last month"
            color="from-blue-500 to-indigo-600"
            delay={0.1}
          />
          
          <StatCard
            icon={<HiUserGroup className="w-6 h-6 text-white" />}
            title="Students Reached"
            value="86"
            change="+8% from last month"
            color="from-green-500 to-emerald-600"
            delay={0.2}
          />
          
          <StatCard
            icon={<HiTrendingUp className="w-6 h-6 text-white" />}
            title="Engagement Score"
            value="A+"
            change="Top 10% nationally"
            color="from-purple-500 to-pink-600"
            delay={0.3}
          />
          
          <StatCard
            icon={<HiCheckCircle className="w-6 h-6 text-white" />}
            title="Resolved Issues"
            value="38"
            change="+15% from last month"
            color="from-emerald-500 to-teal-600"
            delay={0.4}
          />
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <HiChartBar className="w-5 h-5 text-purple-600" />
                Activity Over Time
              </h2>
              <span className="text-sm text-gray-500 capitalize">{timeRange}</span>
            </div>
            
            <div className="space-y-4">
              <AnimatePresence mode="wait">
  {currentData.map((data, index) => {
    // Type guard to safely access the correct property
    const label = timeRange === 'month' 
      ? (data as MonthlyData).month 
      : (data as WeeklyData).week;
    
    return (
      <motion.div
        key={`${timeRange}-${label}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center"
      >
        <div className="w-16 text-sm font-medium text-gray-600 min-w-[4rem]">
          {label}
        </div>
        <div className="flex-1 mx-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Reports</span>
            <span className="text-xs font-medium text-gray-700">{data.reports}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.engagement}%` }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-sm"
            />
          </div>
        </div>
      </motion.div>
    );
  })}
</AnimatePresence>
            </div>
          </motion.div>

          {/* Engagement Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/60"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <HiTrendingUp className="w-5 h-5 text-green-600" />
                Engagement Metrics
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Report Response Rate', value: 94, color: 'from-green-500 to-emerald-600' },
                { label: 'Event Attendance', value: 87, color: 'from-blue-500 to-indigo-600' },
                { label: 'Training Completion', value: 91, color: 'from-purple-500 to-pink-600' },
                { label: 'Leader Satisfaction', value: 96, color: 'from-emerald-500 to-teal-600' }
              ].map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className="font-medium text-gray-800">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full shadow-sm`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recognition Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200 text-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
          
          <HiStar className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-yellow-800 mb-2">🏆 Outstanding Leadership!</h3>
          <p className="text-yellow-700 max-w-2xl mx-auto">
            You re in the <span className="font-bold">top 10%</span> of campus leaders this month! 
            Your dedication to student fellowship is making a real difference.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            View Achievement Details
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  icon, 
  title, 
  value, 
  change, 
  color, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  change: string; 
  color: string; 
  delay: number; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/60 hover:shadow-xl transition-shadow"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
        <HiTrendingUp className="w-3 h-3" />
        {change}
      </p>
    </motion.div>
  );
}