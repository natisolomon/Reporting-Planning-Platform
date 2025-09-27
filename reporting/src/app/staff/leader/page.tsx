// app/staff/leaders/page.tsx
'use client';

import { useState } from 'react';
import { 
  HiUsers, HiPlus, HiCheck, HiX, HiOfficeBuilding, 
  HiPhone, HiMail, HiLocationMarker, HiSearch, HiEye 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import AddLeaderModal from './components/AddLeaderModal';

// Mock Data
const initialLeaders = [
  {
    id: 1,
    name: 'Meron Tesfaye',
    campus: 'Unity University',
    subRegion: 'Piassa',
    phone: '+251 911 234 567',
    email: 'meron@unity.edu.et',
    status: 'active',
    lastReport: '2h ago',
    role: 'Campus Leader'
  },
  {
    id: 2,
    name: 'Daniel Alemayehu',
    campus: 'St. Joseph College',
    subRegion: 'Mexico',
    phone: '+251 912 345 678',
    email: 'daniel@stjoseph.edu.et',
    status: 'active',
    lastReport: '5h ago',
    role: 'Department Leader'
  },
  {
    id: 3,
    name: 'Ruth Getachew',
    campus: 'Bethel College',
    subRegion: 'Phawulos',
    phone: '+251 913 456 789',
    email: 'ruth@bethel.edu.et',
    status: 'inactive',
    lastReport: '14 days ago',
    role: 'Campus Leader'
  },
];

export default function StaffLeadersPage() {
  const [leaders, setLeaders] = useState(initialLeaders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredLeaders = leaders.filter(leader => {
    const matchesSearch = 
      leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.campus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || leader.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
      : 'bg-rose-100 text-rose-800 border-rose-200';
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? <HiCheck className="w-3 h-3" /> : <HiX className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <HiUsers className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Campus Leaders</h1>
                <p className="text-gray-600 mt-1">Manage student leaders in your cluster</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leaders..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                />
                <HiSearch className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              
              {/* Add Leader Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl font-medium"
              >
                <HiPlus className="w-5 h-5" />
                Add Leader
              </motion.button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { key: 'all', label: 'All Leaders', count: leaders.length },
              { key: 'active', label: 'Active', count: leaders.filter(l => l.status === 'active').length },
              { key: 'inactive', label: 'Inactive', count: leaders.filter(l => l.status === 'inactive').length }
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
                  filter === tab.key ? 'bg-emerald-500/20' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLeaders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiUsers className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leaders found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first campus leader to get started'}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
            >
              Add Leader
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLeaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Header */}
                  <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{leader.name}</h3>
                          <p className="text-sm text-emerald-700 font-medium">{leader.role}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(leader.status)}`}>
                        {getStatusIcon(leader.status)}
                        {leader.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="space-y-4">
                      {/* Campus */}
                      <div className="flex items-start gap-3">
                        <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Campus</p>
                          <p className="text-gray-800 font-medium">{leader.campus}</p>
                        </div>
                      </div>

                      {/* Region */}
                      <div className="flex items-start gap-3">
                        <HiLocationMarker className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Region</p>
                          <p className="text-gray-800 font-medium">{leader.subRegion}</p>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <HiPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{leader.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiMail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-600 truncate">{leader.email}</span>
                        </div>
                      </div>

                      {/* Last Report */}
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Last Report</p>
                        <p className="text-sm text-gray-700">{leader.lastReport}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 text-emerald-600 hover:text-emerald-700 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
                        <HiEye className="w-4 h-4" />
                        View Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddLeaderModal
            onClose={() => setIsModalOpen(false)}
            onAdd={(newLeader) =>
              setLeaders((prev) => [...prev, { ...newLeader, 
                id: Date.now(),
                status: 'active',
                lastReport: 'Just added',
             }])
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}