// app/leader/dashboard/page.tsx

import { HiHome, HiClipboardList, HiCalendar, HiChat, HiUserCircle, HiBell, HiCheck, HiX } from 'react-icons/hi';

export default function LeaderDashboard() {
  // Mock Data
  const campus = "Unity University";
  const region = "Piassa Region";
  const lastReportDate = "2 hours ago";
  const pendingActions = 1;
  const upcomingEvent = {
    title: "Leadership & Fellowship Workshop",
    date: "May 10, 2025",
    venue: "Student Center, Room 302",
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center border">
            <HiClipboardList className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Last Report</p>
            <p className="text-sm font-medium text-gray-800">{lastReportDate}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm text-center border">
            <HiCheck className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-sm font-medium text-green-700">Active</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          {/* Submit Report */}
          <a
            href="/leader/submit-report"
            className="block p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow transition"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <HiClipboardList className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-800">Submit New Report</h3>
                <p className="text-sm text-gray-600">Share updates from campus</p>
              </div>
            </div>
          </a>

          {/* View My Reports */}
          <a
            href="/leader/my-reports"
            className="block p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow transition"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
                <HiChat className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-800">My Reports</h3>
                <p className="text-sm text-gray-600">View history & staff responses</p>
              </div>
            </div>
          </a>

          {/* Upcoming Event */}
          {upcomingEvent && (
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <HiCalendar className="w-6 h-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-semibold text-gray-800">{upcomingEvent.title}</h3>
                  <p className="text-sm text-gray-600">{upcomingEvent.date} • {upcomingEvent.venue}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pending Action */}
          {pendingActions > 0 && (
            <div className="p-5 bg-orange-50 border border-orange-200 rounded-2xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <HiBell className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-800">Action Required</h3>
                  <p className="text-sm text-gray-600">Staff responded to your report — please review.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">
            Contact your Staff Officer or call +251 910 123 456 for support.
          </p>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View Support Guide →
          </button>
        </div>
      </main>
    </div>
  );
}