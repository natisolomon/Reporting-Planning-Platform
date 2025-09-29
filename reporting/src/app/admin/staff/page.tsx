// app/admin/staff/page.tsx
'use client';

import { HiUser, HiMail, HiPhone, HiOfficeBuilding, HiCheck, HiX, HiUserGroup, HiSearch, HiPlus } from 'react-icons/hi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Staff Data
const staffList = [
  { id: 1, name: 'Daniel Kebede', region: 'Central 1', phone: '+251 910 123 456', email: 'daniel@evasue.org', status: 'active' },
  { id: 2, name: 'Meron Alemu', region: 'South', phone: '+251 911 234 567', email: 'meron@evasue.org', status: 'active' },
  { id: 3, name: 'Solomon Tekle', region: 'North', phone: '+251 912 345 678', email: 'solomon@evasue.org', status: 'inactive' },
];

// Supervisor Data
const supervisorList = [
  { id: 1, name: 'Abebe Kebede', region: 'Central 1', phone: '+251 920 123 456', email: 'abebe@evasue.org', status: 'active' },
  { id: 2, name: 'Selamawit Bekele', region: 'Mexico', phone: '+251 921 234 567', email: 'selam@evasue.org', status: 'active' },
  { id: 3, name: 'Tigist Haile', region: 'Phawulos', phone: '+251 922 345 678', email: 'tigist@evasue.org', status: 'inactive' },
  { id: 4, name: 'Yohannes Tadesse', region: 'Piassa', phone: '+251 923 456 789', email: 'yohannes@evasue.org', status: 'active' },
];

export default function AdminStaffPage() {
  const [view, setView] = useState<'staff' | 'supervisor'>('staff');
  const [searchTerm, setSearchTerm] = useState('');

  const currentData = view === 'staff' ? staffList : supervisorList;
  const activeCount = currentData.filter(item => item.status === 'active').length;
  const inactiveCount = currentData.filter(item => item.status === 'inactive').length;

  const filteredData = currentData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {view === 'staff' ? 'Staff Management' : 'Supervisor Management'}
            </h1>
            <p className="text-gray-600 mt-1">
              {view === 'staff' 
                ? 'Manage regional staff members' 
                : 'Manage regional supervisors'
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
              <HiCheck className="text-green-600 w-4 h-4" />
              <span className="font-semibold text-green-800">{activeCount} Active</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-200"
            >
              <HiX className="text-red-600 w-4 h-4" />
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
              onClick={() => setView('staff')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                view === 'staff'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <HiUser className="w-4 h-4" />
              Staff
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('supervisor')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                view === 'supervisor'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <HiUserGroup className="w-4 h-4" />
              Supervisors
            </motion.button>
          </div>

          {/* Search & Add Button */}
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${view}...`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <HiPlus className="w-5 h-5" />
              Add {view === 'staff' ? 'Staff' : 'Supervisor'}
            </motion.button>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/70 border-b border-gray-200">
                <tr>
                  <th className="text-left pl-6 py-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Region</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                  {filteredData.length === 0 ? (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <td colSpan={4} className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {view === 'staff' ? <HiUser className="w-8 h-8 text-gray-400" /> : <HiUserGroup className="w-8 h-8 text-gray-400" />}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No {view} found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          {searchTerm ? 'Try adjusting your search terms' : `No ${view} match your criteria`}
                        </p>
                      </td>
                    </motion.tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 transition group"
                      >
                        <td className="pl-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md">
                              {item.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-gray-900">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="flex items-center gap-2">
                            <HiOfficeBuilding className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{item.region}</span>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <HiPhone className="w-4 h-4" />
                              <span>{item.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <HiMail className="w-4 h-4" />
                              <span className="truncate max-w-xs">{item.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-5">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                              item.status === 'active'
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                          >
                            {item.status === 'active' ? <HiCheck className="w-3 h-3" /> : <HiX className="w-3 h-3" />}
                            {item.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-200/40">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{currentData.length}</span> {view}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}