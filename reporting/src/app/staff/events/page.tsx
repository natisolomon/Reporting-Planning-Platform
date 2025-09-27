// app/staff/events/page.tsx
'use client';

import { HiCalendar, HiLocationMarker, HiUserGroup, HiTicket, HiPlus } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CreateEventModal from './components/CreateEventModal';

const events = [
  {
    id: 1,
    title: "Leadership & Fellowship Retreat",
    date: "May 10, 2025",
    time: "9:00 AM – 5:00 PM",
    venue: "Green Valley Resort",
    organizer: "NGO Ethiopia",
    attendees: "All Leaders & Students",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600",
    spotsLeft: 12,
  },
  {
    id: 2,
    title: "End-of-Semester Celebration",
    date: "June 5, 2025",
    time: "4:00 PM – 7:00 PM",
    venue: "Main Campus Lawn",
    organizer: "Unity University NGO Chapter",
    attendees: "Open to all",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600",
    spotsLeft: null,
  },
];

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-8">
        <Link href="/staff/dashboard" className="text-blue-600 text-sm font-medium mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
            <p className="text-gray-600 mt-1">Plan, organize, and inspire through events</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <HiPlus className="w-5 h-5" />
            Create Event
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCalendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              There are no upcoming events. Create your first event to get started!
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
            >
              Create Your First Event
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition group"
                >
                  <div className="md:flex">
                    {/* Image */}
                    

                    {/* Content */}
                    <div className="p-6 flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <HiCalendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{event.date}</span> • {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <HiLocationMarker className="w-4 h-4 text-blue-500" />
                          {event.venue}
                        </div>
                        <div className="flex items-center gap-2">
                          <HiUserGroup className="w-4 h-4 text-blue-500" />
                          {event.attendees}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {event.spotsLeft !== null && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                            <HiTicket className="w-3 h-3" />
                            Only {event.spotsLeft} spots left!
                          </span>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                          View Details
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
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
        {isModalOpen && <CreateEventModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}