// app/admin/leaders/page.tsx
'use client';

import { useState } from 'react';
import { HiUser, HiOfficeBuilding, HiLocationMarker, HiPhone, HiMail, HiPlus, HiSearch, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data - replace with API call later
const initialLeaders = [
  { id: 1, name: 'Meron Tesfaye', campus: 'Unity University', region: 'Central 1', phone: '+251 911 234 567', email: 'meron@unity.edu.et', role: 'Campus Leader' },
  { id: 2, name: 'Daniel Bekele', campus: 'AAU', region: 'Central 1', phone: '+251 922 345 678', email: 'daniel@aau.edu.et', role: 'Campus Leader' },
  { id: 3, name: 'Selamawit Alemu', campus: 'Haramaya University', region: 'East', phone: '+251 933 456 789', email: 'selam@haramaya.edu.et', role: 'Campus Leader' },
  { id: 4, name: 'Abel Tadesse', campus: 'Bahir Dar University', region: 'North', phone: '+251 944 567 890', email: 'abel@bd.edu.et', role: 'Campus Leader' },
  { id: 5, name: 'Ruth Getachew', campus: 'Jimma University', region: 'South', phone: '+251 955 678 901', email: 'ruth@jimma.edu.et', role: 'Campus Leader' },
];

export default function AdminLeadersPage() {
  const [leaders, setLeaders] = useState(initialLeaders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeader, setNewLeader] = useState({
    name: '',
    campus: '',
    region: 'Central 1',
    phone: '',
    email: '',
    role: 'Campus Leader',
  });

  // Get unique regions for filter dropdown
  const regions = ['All Regions', ...new Set(initialLeaders.map(leader => leader.region))];

  // Filter leaders
  const filteredLeaders = leaders.filter(leader => {
    const matchesSearch = leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          leader.campus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          leader.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'All Regions' || leader.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  // Handle form submission
  const handleAddLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeader.name || !newLeader.campus || !newLeader.phone) return;
    
    const leader = {
      id: leaders.length + 1,
      ...newLeader,
    };
    
    setLeaders([leader, ...leaders]);
    setNewLeader({
      name: '',
      campus: '',
      region: 'Central 1',
      phone: '',
      email: '',
      role: 'Campus Leader',
    });
    setIsModalOpen(false);
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
          <h1 className="text-3xl font-bold text-gray-900">All Leaders</h1>
          <p className="text-gray-600 mt-1">View and manage all {leaders.length}+ campus leaders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden"
        >
          {/* Controls */}
          <div className="p-6 border-b border-gray-200/40">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <HiSearch className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leaders, campuses, regions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              {/* Add Leader Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <HiPlus className="w-5 h-5" />
                Add Leader
              </motion.button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70">
                  <th className="text-left pl-6 py-4 font-semibold text-gray-700">Leader</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Campus</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Region</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-4 font-semibold text-gray-700">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                  {filteredLeaders.length === 0 ? (
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <td colSpan={5} className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <HiUser className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No leaders found</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                          {searchTerm ? 'Try adjusting your search terms' : 'No leaders match your filter criteria'}
                        </p>
                      </td>
                    </motion.tr>
                  ) : (
                    filteredLeaders.map((leader, index) => (
                      <motion.tr
                        key={leader.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 transition group"
                      >
                        <td className="pl-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {leader.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{leader.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="flex items-center gap-2">
                            <HiOfficeBuilding className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{leader.campus}</span>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="flex items-center gap-2">
                            <HiLocationMarker className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{leader.region}</span>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <HiPhone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 text-sm">{leader.phone}</span>
                            </div>
                            {leader.email && (
                              <div className="flex items-center gap-2">
                                <HiMail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 text-sm truncate max-w-xs">{leader.email}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-5">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            <HiUser className="w-3 h-3" />
                            {leader.role}
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
              Showing <span className="font-medium">{filteredLeaders.length}</span> of <span className="font-medium">{leaders.length}</span> leaders
            </p>
          </div>
        </motion.div>
      </div>

      {/* Add Leader Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Add New Leader</h2>
                    <p className="text-red-100 mt-1">Fill in the details below</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Modal Body */}
              <form onSubmit={handleAddLeader} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name *</label>
                  <div className="relative">
                    <HiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newLeader.name}
                      onChange={(e) => setNewLeader({...newLeader, name: e.target.value})}
                      placeholder="e.g., Meron Tesfaye"
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Campus *</label>
                  <div className="relative">
                    <HiOfficeBuilding className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newLeader.campus}
                      onChange={(e) => setNewLeader({...newLeader, campus: e.target.value})}
                      placeholder="e.g., Unity University"
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Region *</label>
                  <div className="relative">
                    <HiLocationMarker className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <select
                      value={newLeader.region}
                      onChange={(e) => setNewLeader({...newLeader, region: e.target.value})}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                    >
                      {regions.slice(1).map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Phone *</label>
                  <div className="relative">
                    <HiPhone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={newLeader.phone}
                      onChange={(e) => setNewLeader({...newLeader, phone: e.target.value})}
                      placeholder="+251 9XX XXX XXX"
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Email (Optional)</label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={newLeader.email}
                      onChange={(e) => setNewLeader({...newLeader, email: e.target.value})}
                      placeholder="name@university.edu.et"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-5 py-2.5 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all font-medium shadow-lg"
                  >
                    Add Leader
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}