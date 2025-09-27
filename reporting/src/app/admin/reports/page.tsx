// app/admin/reports/page.tsx
'use client';

import { HiClipboardList, HiSearch, HiExclamation, HiClock, HiCheck, HiXCircle, HiUser, HiLocationMarker, HiOfficeBuilding, HiDocumentText } from 'react-icons/hi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reports = [
  {
    id: 1,
    campus: 'Unity University',
    leader: 'Meron Tesfaye',
    region: 'Central 1',
    issue: 'Final exams causing high stress',
    category: 'Academic',
    priority: 'urgent',
    date: '2 hours ago',
    status: 'in-progress',
  },
  {
    id: 2,
    campus: 'St. Joseph College',
    leader: 'Daniel Alemayehu',
    region: 'Mexico',
    issue: 'Need fellowship materials for small groups',
    category: 'Fellowship',
    priority: 'high',
    date: '5 hours ago',
    status: 'pending',
  },
  {
    id: 3,
    campus: 'Bethel College',
    leader: 'Ruth Getachew',
    region: 'Phawulos',
    issue: 'Monthly leadership meeting held successfully',
    category: 'Event',
    priority: 'low',
    date: '1 day ago',
    status: 'resolved',
  },
  {
    id: 4,
    campus: 'Adama Science College',
    leader: 'Solomon Kassahun',
    region: 'Phawulos',
    issue: 'Food insecurity affecting 30+ students',
    category: 'Need',
    priority: 'urgent',
    date: '1 day ago',
    status: 'in-progress',
  },
];

export default function AdminReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.campus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.leader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
                          (filter === 'urgent' && ['urgent', 'high'].includes(report.priority)) ||
                          report.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'resolved':
        return { 
          icon: <HiCheck className="w-3 h-3" />, 
          text: 'Resolved', 
          color: 'bg-green-100 text-green-800 border border-green-200' 
        };
      case 'in-progress':
        return { 
          icon: <HiClock className="w-3 h-3" />, 
          text: 'In Progress', 
          color: 'bg-blue-100 text-blue-800 border border-blue-200' 
        };
      case 'pending':
        return { 
          icon: <HiXCircle className="w-3 h-3" />, 
          text: 'Pending', 
          color: 'bg-red-100 text-red-800 border border-red-200' 
        };
      default:
        return { 
          icon: <HiXCircle className="w-3 h-3" />, 
          text: 'Unknown', 
          color: 'bg-gray-100 text-gray-800 border border-gray-200' 
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HiClipboardList className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Reports</h1>
              <p className="text-gray-600 mt-1">Monitor and respond to campus insights nationwide</p>
            </div>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports, campuses, issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Reports</option>
              <option value="urgent">Urgent & High Priority</option>
              <option value="pending">Pending Action</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </motion.div>

        {/* Reports List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredReports.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiDocumentText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm ? 'Try adjusting your search terms' : 'No reports match your filter criteria'}
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
                    className="bg-white rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-block w-3 h-3 rounded-full ${
                                  report.priority === 'urgent'
                                    ? 'bg-red-500 animate-pulse'
                                    : report.priority === 'high'
                                    ? 'bg-orange-500'
                                    : report.priority === 'medium'
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                }`}
                              ></span>
                              <h3 className="font-bold text-gray-900">{report.campus}</h3>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                report.priority === 'urgent'
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : report.priority === 'high'
                                  ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                  : report.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  : 'bg-green-100 text-green-800 border border-green-200'
                              }`}>
                                <HiExclamation className="w-3 h-3 inline mr-1" />
                                {report.priority}
                              </span>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                              {statusConfig.icon}
                              {statusConfig.text}
                            </span>
                          </div>

                          {/* Issue */}
                          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                            <p className="text-gray-800 leading-relaxed font-medium">{report.issue}</p>
                          </div>

                          {/* Leader & Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <HiUser className="w-4 h-4 text-red-600" />
                              <span className="font-medium">{report.leader}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiLocationMarker className="w-4 h-4 text-red-600" />
                              <span>{report.region}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiOfficeBuilding className="w-4 h-4 text-red-600" />
                              <span>{report.category}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 pt-2 lg:pt-0">
                          <span className="text-xs text-gray-500 text-right">{report.date}</span>
                          <button className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md whitespace-nowrap">
                            View Details
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
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