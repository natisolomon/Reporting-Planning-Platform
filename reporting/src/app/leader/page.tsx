// app/leader/dashboard/page.tsx
"use client";

import {  
  HiCalendar, 
  HiChat, 
  HiUserCircle, 
  HiBell, 
  HiDocumentText
} from 'react-icons/hi';
import { DashboardBanner, ActionCard, NotificationCard } from './components/Card';

export default function LeaderDashboard() {
  // Mock Data
  const campus = "Unity University";
  const region = "Piassa Region";
  const lastReportDate = "2 hours ago";
  const fellowshipStatus = "Active";
  const pendingActions = 1;
  const upcomingEvent = {
    title: "Leadership & Fellowship Workshop",
    date: "May 10, 2025",
    venue: "Student Center, Room 302",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Dashboard Banner - Contains both stats */}
        <DashboardBanner
          lastReport={lastReportDate}
          fellowshipStatus={fellowshipStatus}
          campus={campus}
          region={region}
          delay={0.1}
        />

        {/* Action Cards */}
        <div className="space-y-6 mt-8">
          <ActionCard
            icon={<HiDocumentText className="w-6 h-6" />}
            title="Submit New Report"
            description="Share updates from your campus fellowship"
            href="/leader/submit-report"
            color="indigo"
            delay={0.2}
          />

          <ActionCard
            icon={<HiChat className="w-6 h-6" />}
            title="My Reports"
            description="View history and staff responses"
            href="/leader/my-reports"
            color="blue"
            delay={0.3}
          />

          {/* Upcoming Event */}
          {upcomingEvent && (
            <NotificationCard
              icon={<HiCalendar className="w-6 h-6" />}
              title={upcomingEvent.title}
              description={
                <span>
                  <span className="font-medium">{upcomingEvent.date}</span> • {upcomingEvent.venue}
                </span>
              }
              color="emerald"
              delay={0.4}
            >
              <button className="text-emerald-700 font-medium text-sm hover:text-emerald-800 flex items-center">
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </NotificationCard>
          )}

          {/* Pending Action */}
          {pendingActions > 0 && (
            <NotificationCard
              icon={<HiBell className="w-6 h-6" />}
              title="Action Required"
              description="Staff responded to your report — please review and take necessary action."
              color="amber"
              delay={0.5}
            >
              <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                Respond Now
              </button>
            </NotificationCard>
          )}
        </div>

        {/* Support Section */}
        <NotificationCard
          icon={<HiUserCircle className="w-6 h-6" />}
          title="Need Support?"
          description={
            <span>
              Contact your Staff Officer or call <span className="font-medium">+251 910 123 456</span> for immediate assistance.
            </span>
          }
          color="indigo"
          delay={0.6}
        >
          <div className="flex flex-wrap gap-3">
            <button className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
              View Support Guide
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="text-gray-600 font-medium hover:text-gray-800 flex items-center">
              Request Training
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </NotificationCard>
      </main>
    </div>
  );
}