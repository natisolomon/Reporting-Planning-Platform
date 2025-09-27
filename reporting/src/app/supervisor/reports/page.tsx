// app/super-staff/reports/page.tsx
'use client';

import { useState } from 'react';
import { 
  HiOutlineExclamation, HiCheck, HiClock, HiXCircle, HiSearch, 
  HiUser, HiOfficeBuilding, HiLocationMarker, HiDocumentText 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const reports = [
  {
    id: 1,
    campus: 'Unity University',
    leader: 'Meron Tesfaye',
    subRegion: 'Piassa',
    issue: 'Students stressed before final exams',
    category: 'Academic',
    priority: 'urgent',
    date: '2 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    campus: 'St. Joseph College',
    leader: 'Daniel Alemayehu',
    subRegion: 'Mexico',
    issue: 'Need fellowship materials for small groups',
    category: 'Fellowship',
    priority: 'high',
    date: '5 hours ago',
    status: 'in-progress',
  },
  {
    id: 3,
    campus: 'Bethel College',
    leader: 'Ruth Getachew',
    subRegion: 'Phawulos',
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
    subRegion: 'Phawulos',
    issue: 'Food insecurity affecting 30+ students',
    category: 'Need',
    priority: 'urgent',
    date: '1 day ago',
    status: 'pending',
  },
];

const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.campus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.leader.toLowerCase().includes(searchQuery.toLowerCase());
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
          icon: <HiXCircle className="w-3 h-3" />, 
          text: 'Pending', 
          color: 'bg-red-100 text-red-700' 
        };
      case 'in-progress':
        return { 
          icon: <HiClock className="w-3 h-3" />, 
          text: 'In Progress', 
          color: 'bg-blue-100 text-blue-700' 
        };
      case 'resolved':
        return { 
          icon: <HiCheck className="w-3 h-3" />, 
          text: 'Resolved', 
          color: 'bg-green-100 text-green-700' 
        };
      default:
        return { 
          icon: <HiXCircle className="w-3 h-3" />, 
          text: 'Unknown', 
          color: 'bg-gray-100 text-gray-700' 
        };
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor and respond to campus updates</p>
          </div>
          
          {/* Search */}
          <div className="relative md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            <HiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
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
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === tab.key ? 'bg-indigo-500/20' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Reports List - Modern Cards */}
        <div className="space-y-6">
          <AnimatePresence>
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
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className={`inline-block w-3 h-3 rounded-full ${
                                report.priority === 'urgent'
                                  ? 'bg-red-500'
                                  : report.priority === 'high'
                                  ? 'bg-orange-500'
                                  : report.priority === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}></span>
                              <h3 className="font-bold text-gray-900">{report.campus}</h3>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                                <HiOutlineExclamation className="w-3 h-3 inline mr-1" />
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
                              <HiUser className="w-4 h-4 text-indigo-600" />
                              <span className="font-medium">{report.leader}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiLocationMarker className="w-4 h-4 text-indigo-600" />
                              <span>{report.subRegion}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HiOfficeBuilding className="w-4 h-4 text-indigo-600" />
                              <span>{report.category}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-3 pt-2 lg:pt-0">
                          <span className="text-xs text-gray-500 text-right">{report.date}</span>
                          <Link 
                            href={`/supervisor/reports/${report.id}`}
                            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
                          >
                            View Details
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {filteredReports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600"
          >
            <span>Showing {filteredReports.length} of {reports.length} reports</span>
            <div className="flex gap-2">
              <button 
                disabled={true}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;