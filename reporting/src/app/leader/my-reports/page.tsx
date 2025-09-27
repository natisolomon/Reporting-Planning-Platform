// app/leader/my-reports/page.tsx

import { HiClipboardList, HiCheck, HiClock, HiXCircle, HiChatAlt } from 'react-icons/hi';

const myReports = [
  {
    id: 1,
    issue: "Final exams causing high stress",
    category: "Academic",
    priority: "high",
    date: "2 hours ago",
    status: "in-progress",
    response: "Team will visit on May 8 for stress management session.",
  },
  {
    id: 2,
    issue: "Need more Bibles for small groups",
    category: "Fellowship",
    priority: "medium",
    date: "1 week ago",
    status: "resolved",
    response: "Materials shipped – expect by Friday.",
  },
  {
    id: 3,
    issue: "Monthly fellowship held successfully",
    category: "Event",
    priority: "low",
    date: "2 weeks ago",
    status: "resolved",
    response: "Thank you for the update!",
  },
];

export default function MyReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <a href="/leader/dashboard" className="text-blue-600 text-sm font-medium mb-4 inline-block">
          ← Back to Dashboard
        </a>
        <h1 className="text-xl font-semibold text-gray-800">My Reports</h1>
        <p className="text-sm text-gray-600">History of your submissions and responses</p>
      </header>

      <main className="p-6 space-y-4">
        {myReports.map((report) => (
          <div key={report.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      report.priority === 'urgent'
                        ? 'bg-red-500'
                        : report.priority === 'high'
                        ? 'bg-orange-500'
                        : 'bg-blue-500'
                    }`}
                  ></span>
                  <span className="text-sm font-medium text-gray-700">{report.category}</span>
                </div>
                <p className="font-medium text-gray-800">{report.issue}</p>
                <p className="text-sm text-gray-500 mt-1">Submitted {report.date}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.status === 'resolved'
                    ? 'bg-green-100 text-green-700'
                    : report.status === 'in-progress'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {report.status === 'resolved' && <HiCheck className="w-3 h-3 mr-1" />}
                {report.status === 'in-progress' && <HiClock className="w-3 h-3 mr-1" />}
                {report.status === 'pending' && <HiXCircle className="w-3 h-3 mr-1" />}
                {report.status.replace('-', ' ')}
              </span>
            </div>

            {report.response && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-3">
                <div className="flex items-start">
                  <HiChatAlt className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                  <p className="text-sm text-blue-800">
                    <strong>Staff Response:</strong> {report.response}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}