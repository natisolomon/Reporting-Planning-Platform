// app/admin/events/page.tsx
'use client';

import { HiCalendar, HiStar, HiUserGroup, HiLocationMarker, HiTicket, HiPlus, HiArrowRight, HiSearch } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Use local images from: public/images/events/
const events = [
  {
    id: 1,
    title: 'National Leadership Summit (NLS)',
    type: 'National',
    date: 'July 12–15, 2025',
    venue: 'Addis Ababa Convention Center',
    attendees: '500+ Leaders & Graduates',
    status: 'planned',
    color: 'from-yellow-500 to-orange-600',
    spotsLeft: 120,
    image: '/evasue1.jpg',
  },
  {
    id: 2,
    title: 'National Mission Send (NMS)',
    type: 'National',
    date: 'August 20–23, 2025',
    venue: 'Unity University Grounds',
    attendees: 'All EvaSUE Members',
    status: 'planned',
    color: 'from-red-500 to-pink-600',
    spotsLeft: 300,
    image: '/evasue2.jpg',
  },
  {
    id: 3,
    title: 'Regional Leadership Summit – Central 1',
    type: 'Regional',
    date: 'June 14–15, 2025',
    venue: 'Green Valley Resort',
    attendees: '120 Leaders',
    status: 'confirmed',
    color: 'from-blue-500 to-indigo-600',
    spotsLeft: null,
    image: '/evasue3.jpg',
  },
  {
    id: 4,
    title: 'Fellowship Retreat – South West',
    type: 'Regional',
    date: 'July 5–6, 2025',
    venue: 'Lake Awassa Lodge',
    attendees: '80 Leaders',
    status: 'planned',
    color: 'from-purple-500 to-pink-600',
    spotsLeft: 25,
    image: '/evasue4.jpg',
  },
];

export default function AdminEventsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || event.type.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HiCalendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events & Summits</h1>
              <p className="text-gray-600 mt-1">Manage national and regional gatherings</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <HiPlus className="w-5 h-5" /> Create Event
          </motion.button>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events, venues, types..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {[
              { key: 'all', label: 'All Events' },
              { key: 'national', label: 'National' },
              { key: 'regional', label: 'Regional' },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  filter === tab.key
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-2 text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiCalendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm ? 'Try adjusting your search terms' : 'No events match your filter criteria'}
                </p>
              </motion.div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${event.color}`}
                      >
                        {event.type}
                      </span>
                      {event.spotsLeft !== null && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 text-xs rounded-full border border-amber-200">
                          <HiTicket className="w-3 h-3" /> {event.spotsLeft} spots left
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {event.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <HiCalendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiLocationMarker className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiUserGroup className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 group"
                      >
                        View Details 
                        <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Event Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-red-800 flex items-center gap-2 mb-4">
            <HiStar className="w-5 h-5" />
            Upcoming Key Events
          </h2>
          <ul className="space-y-3 text-sm text-red-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500">🌟</span>
              <span><strong>NLS</strong> (July) – Priority: High – Needs budget approval.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">📣</span>
              <span><strong>NMS</strong> – Invite all graduates via SMS & email.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✅</span>
              <span>Regional Summits – Confirm venues by May 30.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}