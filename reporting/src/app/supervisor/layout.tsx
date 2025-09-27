// app/super-staff/layout.tsx

import Sidebar from './components/Sidebar';
import Header from './components/Header';

// ✅ This must be a default-exported React component
export default function SuperStaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}