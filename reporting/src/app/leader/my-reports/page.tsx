// app/leader/my-reports/page.tsx
import { HiClipboardList, HiCheck, HiClock, HiXCircle, HiChatAlt } from 'react-icons/hi';
import Link from 'next/link';

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

// Priority color mapping
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-sky-500';
    case 'low': return 'bg-emerald-500';
    default: return 'bg-gray-400';
  }
};

// Status config
const statusConfig = {
  resolved: { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-700', 
    border: 'border-emerald-200',
    icon: <HiCheck className="w-3 h-3" />
  },
  'in-progress': { 
    bg: 'bg-sky-50', 
    text: 'text-sky-700', 
    border: 'border-sky-200',
    icon: <HiClock className="w-3 h-3" />
  },
  pending: { 
    bg: 'bg-amber-50', 
    text: 'text-amber-700', 
    border: 'border-amber-200',
    icon: <HiXCircle className="w-3 h-3" />
  }
};

export default function MyReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2.5 bg-sky-100 rounded-xl">
                <HiClipboardList className="w-5 h-5 text-sky-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2.5 bg-emerald-100 rounded-xl">
                <HiCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-emerald-700">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2.5 bg-sky-100 rounded-xl">
                <HiClock className="w-5 h-5 text-sky-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-sky-700">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {myReports.map((report) => {
            const status = statusConfig[report.status as keyof typeof statusConfig] || statusConfig.pending;
            
            return (
              <div 
                key={report.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Priority Indicator */}
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(report.priority)} opacity-80`}></div>
                      
                      {/* Category Badge */}
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {report.category}
                      </span>
                      
                      {/* Date */}
                      <span className="text-sm text-gray-500 ml-auto">
                        {report.date}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                      {report.issue}
                    </h3>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.text} border ${status.border} whitespace-nowrap`}>
                    {status.icon && <span className="mr-1.5">{status.icon}</span>}
                    {report.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Staff Response */}
                {report.response && (
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-sky-100 rounded-lg">
                        <HiChatAlt className="w-4 h-4 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">Staff Response</p>
                        <p className="text-gray-600 leading-relaxed">{report.response}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State (for when there are no reports) */}
        {myReports.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              You havent submitted any reports. Start by sharing updates about your fellowship activities.
            </p>
            <Link 
              href="/leader/submit-report" 
              className="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl transition-colors"
            >
              Submit Your First Report
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}