// app/staff/reports/page.tsx
'use client';

import { useState } from 'react';
import { HiSearch, HiOutlineExclamation, HiChatAlt, HiCheckCircle, HiClock, HiXCircle, HiArrowRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function StaffReports() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    { 
      id: 1, 
      campus: 'Unity University', 
      issue: 'Students stressed before exams', 
      priority: 'urgent', 
      date: '2h ago',
      leader: 'Meron T.',
      status: 'pending',
      category: 'Academic'
    },
    { 
      id: 2, 
      campus: 'St. Joseph College', 
      issue: 'Need fellowship materials for small groups', 
      priority: 'high', 
      date: '5h ago',
      leader: 'Daniel K.',
      status: 'in-progress',
      category: 'Fellowship'
    },
    { 
      id: 3, 
      campus: 'Addis Ababa University', 
      issue: 'Monthly fellowship event was successful', 
      priority: 'low', 
      date: '1d ago',
      leader: 'Sarah M.',
      status: 'resolved',
      category: 'Event'
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.campus.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || report.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          icon: <HiClock className="w-4 h-4" />, 
          text: 'Pending', 
          color: 'text-gray-600 bg-gray-100' 
        };
      case 'in-progress':
        return { 
          icon: <HiChatAlt className="w-4 h-4" />, 
          text: 'In Progress', 
          color: 'text-blue-600 bg-blue-100' 
        };
      case 'resolved':
        return { 
          icon: <HiCheckCircle className="w-4 h-4" />, 
          text: 'Resolved', 
          color: 'text-green-600 bg-green-100' 
        };
      default:
        return { 
          icon: <HiXCircle className="w-4 h-4" />, 
          text: 'Unknown', 
          color: 'text-gray-600 bg-gray-100' 
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Manage and respond to campus leader reports</p>
          </div>
          
          {/* Search */}
          <div className="relative md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <HiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { key: 'all', label: 'All Reports', count: reports.length },
            { key: 'pending', label: 'Pending', count: reports.filter(r => r.status === 'pending').length },
            { key: 'in-progress', label: 'In Progress', count: reports.filter(r => r.status === 'in-progress').length },
            { key: 'resolved', label: 'Resolved', count: reports.filter(r => r.status === 'resolved').length }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                filter === tab.key
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label} 
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === tab.key ? 'bg-blue-500/20' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Reports List - Chat Style */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredReports.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiChatAlt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchQuery ? 'Try adjusting your search terms' : 'All reports have been addressed'}
                </p>
              </motion.div>
            ) : (
              filteredReports.map((report, index) => {
                const statusConfig = getStatusConfig(report.status);
                return (
                  <motion.div
                    key={report.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {report.leader.split(' ').map(n => n[0]).join('')}
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900">{report.campus}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                                <HiOutlineExclamation className="w-3 h-3 inline mr-1" />
                                {report.priority}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                              {statusConfig.icon}
                              {statusConfig.text}
                            </span>
                          </div>

                          {/* Leader Info */}
                          <p className="text-sm text-gray-600 mb-3">
                            <span className="font-medium">{report.leader}</span> • {report.category} • {report.date}
                          </p>

                          {/* Message Body */}
                          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                            <p className="text-gray-800 leading-relaxed">{report.issue}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Link 
                              href={`/staff/reports/${report.id}`}
                              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md"
                            >
                              Respond
                              <HiArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <button className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                              View Details
                            </button>
                          </div>
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