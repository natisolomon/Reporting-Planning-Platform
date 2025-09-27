// app/staff/layout.tsx
'use client'
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
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