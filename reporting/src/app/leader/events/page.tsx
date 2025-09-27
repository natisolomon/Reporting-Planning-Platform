// app/leader/events/page.tsx

import { HiCalendar, HiLocationMarker, HiUserGroup } from 'react-icons/hi';

const events = [
  {
    title: "Leadership & Fellowship Workshop",
    date: "May 10, 2025",
    time: "10:00 AM – 3:00 PM",
    venue: "Student Center, Room 302",
    organizer: "Central 1 Team",
    attendees: "All Leaders & Students",
  },
  {
    title: "End-of-Semester Celebration",
    date: "June 5, 2025",
    time: "4:00 PM – 7:00 PM",
    venue: "Main Campus Lawn",
    organizer: "NGO Ethiopia",
    attendees: "Open to all",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <a href="/leader/dashboard" className="text-blue-600 text-sm font-medium mb-4 inline-block">
          ← Back to Dashboard
        </a>
        <h1 className="text-xl font-semibold text-gray-800">Upcoming Events</h1>
        <p className="text-sm text-gray-600">Join NGO-led programs on campus</p>
      </header>

      <main className="p-6 space-y-4">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <HiCalendar className="w-4 h-4" /> {event.date} • {event.time}
              </div>
              <div className="flex items-center gap-2">
                <HiLocationMarker className="w-4 h-4" /> {event.venue}
              </div>
              <div className="flex items-center gap-2">
                <HiUserGroup className="w-4 h-4" /> {event.attendees}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Organized by: {event.organizer}</p>
          </div>
        ))}
      </main>
    </div>
  );
}