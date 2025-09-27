// app/super-staff/leaders/page.tsx
'use client';

import { useState } from 'react';
import { 
  HiBadgeCheck, HiXCircle, HiMail, HiPhone, HiUserGroup, 
  HiSearch, HiUser, HiOfficeBuilding, HiLocationMarker 
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

// Define TypeScript interfaces
interface Leader {
  id: number;
  name: string;
  campus: string;
  subRegion: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  reports: number;
  lastReport: string;
  role: string;
}

interface StaffMember {
  id: number;
  name: string;
  campus: string;
  subRegion: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  assignedLeaders: number;
  lastActivity: string;
  role: string;
}

// Mock Leaders Data
const leaders: Leader[] = [
  {
    id: 1,
    name: 'Meron Tesfaye',
    campus: 'Unity University',
    subRegion: 'Piassa',
    phone: '+251 911 234 567',
    email: 'meron@unity.edu.et',
    status: 'active',
    reports: 12,
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
    reports: 9,
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
    reports: 0,
    lastReport: '14 days ago',
    role: 'Campus Leader'
  },
  {
    id: 4,
    name: 'Solomon Kassahun',
    campus: 'Adama Science College',
    subRegion: 'Phawulos',
    phone: '+251 914 567 890',
    email: 'solomon@adama.edu.et',
    status: 'active',
    reports: 6,
    lastReport: '1d ago',
    role: 'Event Coordinator'
  },
];

// Mock Staff Data
const staff: StaffMember[] = [
  {
    id: 1,
    name: 'Abebe Kebede',
    campus: 'Central 1 Office',
    subRegion: 'Piassa',
    phone: '+251 921 234 567',
    email: 'abebe@ngo.org',
    status: 'active',
    assignedLeaders: 12,
    lastActivity: '1h ago',
    role: 'Senior Staff'
  },
  {
    id: 2,
    name: 'Selamawit Bekele',
    campus: 'Regional Office',
    subRegion: 'Mexico',
    phone: '+251 922 345 678',
    email: 'selam@ngo.org',
    status: 'active',
    assignedLeaders: 8,
    lastActivity: '3h ago',
    role: 'Staff Officer'
  },
  {
    id: 3,
    name: 'Tigist Haile',
    campus: 'Field Office',
    subRegion: 'Phawulos',
    phone: '+251 923 456 789',
    email: 'tigist@ngo.org',
    status: 'inactive',
    assignedLeaders: 0,
    lastActivity: '2 days ago',
    role: 'Field Coordinator'
  },
];

export default function LeadersPage() {
  const [view, setView] = useState<'leaders' | 'staff'>('leaders');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCount = view === 'leaders' 
    ? leaders.filter(l => l.status === 'active').length
    : staff.filter(s => s.status === 'active').length;
  
  const inactiveCount = view === 'leaders' 
    ? leaders.filter(l => l.status === 'inactive').length
    : staff.filter(s => s.status === 'inactive').length;

  const filteredData = view === 'leaders' 
    ? leaders.filter(leader => 
        leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leader.campus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leader.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : staff.filter(staffMember => 
        staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffMember.campus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffMember.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

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
            <h1 className="text-3xl font-bold text-gray-900">
              {view === 'leaders' ? 'Campus Leaders' : 'Staff Members'}
            </h1>
            <p className="text-gray-600 mt-1">
              {view === 'leaders' 
                ? 'Manage student leaders across your region' 
                : 'Manage staff members in your cluster'
              }
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-200"
            >
              <HiBadgeCheck className="text-green-600 w-4 h-4" />
              <span className="font-semibold text-green-800">{activeCount} Active</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-200"
            >
              <HiXCircle className="text-red-600 w-4 h-4" />
              <span className="font-semibold text-red-800">{inactiveCount} Inactive</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Toggle & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Toggle Button */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('leaders')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                view === 'leaders'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <HiUser className="w-4 h-4" />
              Leaders
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('staff')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                view === 'staff'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <HiUserGroup className="w-4 h-4" />
              Staff
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${view}...`}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
            <HiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70">
                  <th className="text-left pl-6 py-4 font-semibold text-gray-700">Name & Role</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Region</th>
                  {view === 'leaders' ? (
                    <th className="text-left py-4 font-semibold text-gray-700">Reports</th>
                  ) : (
                    <th className="text-left py-4 font-semibold text-gray-700">Assigned Leaders</th>
                  )}
                  <th className="text-left py-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50/50 transition cursor-pointer group"
                    >
                      <td className="pl-6 py-5">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <HiOfficeBuilding className="w-3 h-3" /> {item.role}
                          </p>
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700 flex items-center gap-1">
                            <HiPhone className="w-3 h-3" /> {item.phone}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <HiMail className="w-3 h-3" /> {item.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-700">{item.campus}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <HiLocationMarker className="w-3 h-3" /> {item.subRegion}
                          </p>
                        </div>
                      </td>
                      <td className="py-5">
                        {view === 'leaders' ? (
                          <span className="text-sm text-blue-700 font-medium">
                            {(item as Leader).reports} reports
                          </span>
                        ) : (
                          <span className="text-sm text-purple-700 font-medium">
                            {(item as StaffMember).assignedLeaders} leaders
                          </span>
                        )}
                      </td>
                      <td className="py-5">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          <HiBadgeCheck className={`w-3 h-3 ${item.status === 'active' ? 'text-green-600' : 'text-red-600'}`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5">
                        <span className="text-sm text-gray-600">
                          {view === 'leaders' 
                            ? (item as Leader).lastReport 
                            : (item as StaffMember).lastActivity}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {view === 'leaders' ? <HiUser className="w-8 h-8 text-gray-400" /> : <HiUserGroup className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {view} found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchQuery ? 'Try adjusting your search terms' : `No ${view} match your criteria`}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}