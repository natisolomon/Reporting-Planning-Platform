// app/leader/layout.tsx

import LeaderSidebar from './components/LeaderSidebar';
import LeaderHeader from './components/LeaderHeader';

export default function LeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <LeaderSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <LeaderHeader />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}