// app/leader/events/page.tsx
'use client';

import { useState } from 'react';
import { HiCalendar, HiLocationMarker, HiUserGroup, HiPlus } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import CreateEventModal from '../components/CreateEventModal';

interface EventFormData {
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  description: string;
}

const events = [
  {
    id: 1,
    title: "Leadership & Fellowship Workshop",
    date: "May 10, 2025",
    time: "10:00 AM – 3:00 PM",
    venue: "Student Center, Room 302",
    organizer: "Central 1 Team",
    attendees: "All Leaders & Students",
    category: "workshop",
  },
  {
    id: 2,
    title: "End-of-Semester Celebration",
    date: "June 5, 2025",
    time: "4:00 PM – 7:00 PM",
    venue: "Main Campus Lawn",
    organizer: "NGO Ethiopia",
    attendees: "Open to all",
    category: "celebration",
  },
  {
    id: 3,
    title: "Prayer & Fasting Day",
    date: "April 28, 2025",
    time: "8:00 AM – 6:00 PM",
    venue: "Chapel Hall",
    organizer: "Campus Fellowship",
    attendees: "Fellowship Members",
    category: "spiritual",
  },
];

const categoryColors = {
  workshop: 'bg-sky-100 text-sky-800',
  celebration: 'bg-amber-100 text-amber-800',
  spiritual: 'bg-emerald-100 text-emerald-800',
  other: 'bg-gray-100 text-gray-800',
};

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEvent = (eventData: EventFormData) => { // Use proper type
  console.log('Creating event:', eventData);
  
  setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center shadow-lg hover:shadow-xl transition-all"
            >
              <HiPlus className="w-4 h-4 mr-2" />
              Create Event
            </motion.button>
          </div>
        </div>
      </header>

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
              className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
            >
              Create Your First Event
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Category Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[event.category as keyof typeof categoryColors]}`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-700 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HiCalendar className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{event.date}</p>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HiLocationMarker className="w-4 h-4 text-amber-600" />
                      </div>
                      <p>{event.venue}</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HiUserGroup className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p>{event.attendees}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Organized by: <span className="font-medium text-gray-700">{event.organizer}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Create Event Modal */}
      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
}