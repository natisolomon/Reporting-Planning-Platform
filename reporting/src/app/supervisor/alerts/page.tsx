// app/super-staff/alerts/page.tsx
'use client';

import { useState } from 'react';
import { 
  HiOutlineExclamation, HiFire, HiClock, HiCheck, HiX, HiBell, 
  HiSearch, HiEye, HiArchive, HiLocationMarker, HiOfficeBuilding
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const alerts = [
  {
    id: 1,
    type: 'urgent-report',
    title: 'Exam Stress Crisis',
    message: 'Unity University leader reports 80% of students overwhelmed before finals.',
    campus: 'Unity University',
    region: 'Piassa',
    time: '2 hours ago',
    status: 'unread',
    severity: 'critical',
  },
  {
    id: 2,
    type: 'leader-inactive',
    title: 'Leader Inactive',
    message: 'Ruth Getachew (Bethel College) has not reported in 14 days.',
    campus: 'Bethel College',
    region: 'Phawulos',
    time: '1 day ago',
    status: 'unread',
    severity: 'high',
  },
  {
    id: 3,
    type: 'system',
    title: 'Monthly Report Due',
    message: 'Regional summary report is due by Friday.',
    campus: null,
    region: 'Central 1',
    time: '3 days ago',
    status: 'read',
    severity: 'medium',
  },
  {
    id: 4,
    type: 'action-completed',
    title: 'Event Confirmed',
    message: 'Leadership workshop at St. Joseph College is confirmed for May 10.',
    campus: 'St. Joseph College',
    region: 'Mexico',
    time: '4 days ago',
    status: 'read',
    severity: 'low',
  },
];

export default function AlertsPage() {
  const [alertsList, setAlertsList] = useState(alerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const unreadCount = alertsList.filter(a => a.status === 'unread').length;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { 
          icon: <HiFire className="w-5 h-5" />, 
          color: 'text-red-600 bg-red-50 border-red-200',
          badge: 'bg-red-100 text-red-800'
        };
      case 'high':
        return { 
          icon: <HiOutlineExclamation className="w-5 h-5" />, 
          color: 'text-orange-600 bg-orange-50 border-orange-200',
          badge: 'bg-orange-100 text-orange-800'
        };
      case 'medium':
        return { 
          icon: <HiBell className="w-5 h-5" />, 
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'low':
        return { 
          icon: <HiCheck className="w-5 h-5" />, 
          color: 'text-green-600 bg-green-50 border-green-200',
          badge: 'bg-green-100 text-green-800'
        };
      default:
        return { 
          icon: <HiBell className="w-5 h-5" />, 
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const markAsRead = (id: number) => {
    setAlertsList(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, status: 'read' } : alert
      )
    );
  };

  const archiveAlert = (id: number) => {
    setAlertsList(prev => prev.filter(alert => alert.id !== id));
  };

  const filteredAlerts = alertsList.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.campus && alert.campus.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && alert.status === 'unread') || 
      (filter === 'read' && alert.status === 'read');
    return matchesSearch && matchesFilter;
  });

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
            <h1 className="text-3xl font-bold text-gray-900">Alerts Center</h1>
            <p className="text-gray-600 mt-1">Urgent issues and system notifications</p>
          </div>
          
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
            >
              <HiBell className="w-4 h-4 animate-pulse" />
              {unreadCount} Unread Alerts
            </motion.span>
          )}
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            <HiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Filter */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {[
              { key: 'all', label: 'All Alerts' },
              { key: 'unread', label: 'Unread' },
              { key: 'read', label: 'Read' }
            ].map((option) => (
              <motion.button
                key={option.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(option.key)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  filter === option.key
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredAlerts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiBell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchQuery ? 'Try adjusting your search terms' : 'All alerts have been addressed'}
                </p>
              </motion.div>
            ) : (
              filteredAlerts.map((alert, index) => {
                const severityConfig = getSeverityConfig(alert.severity);
                return (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    className={`rounded-2xl border ${severityConfig.color} overflow-hidden group ${
                      alert.status === 'unread' ? 'bg-white shadow-sm border-l-4' : 'bg-gray-50'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Alert Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${severityConfig.badge}`}>
                              {severityConfig.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{alert.title}</h3>
                            {alert.status === 'unread' && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                                <HiFire className="w-3 h-3 animate-pulse" />
                                New
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">{alert.message}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {alert.campus && (
                              <div className="flex items-center gap-2">
                                <HiOfficeBuilding className="w-4 h-4" />
                                <span>{alert.campus}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <HiLocationMarker className="w-4 h-4" />
                              <span>{alert.region}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiClock className="w-4 h-4" />
                              <span>{alert.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 pt-2 lg:pt-0">
                          <button 
                            onClick={() => markAsRead(alert.id)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md text-sm"
                          >
                            <HiEye className="w-4 h-4 mr-2" />
                            Mark as Read
                          </button>
                          <button 
                            onClick={() => archiveAlert(alert.id)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm"
                          >
                            <HiArchive className="w-4 h-4 mr-2" />
                            Archive
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}