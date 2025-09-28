// app/admin/layout.tsx

import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}