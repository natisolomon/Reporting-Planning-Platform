// app/super-staff/settings/page.tsx

import { HiUser, HiBell, HiShieldCheck, HiSave } from 'react-icons/hi';

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your preferences and account</p>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <HiUser className="w-5 h-5 mr-2" /> Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Alemayehu Kebede"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                defaultValue="Super Staff – Central 1"
                disabled
                className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-xl text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="alemayehu@ngo-et.org"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+251 910 123 456"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition flex items-center">
            <HiSave className="w-4 h-4 mr-2" /> Save Changes
          </button>
        </section>

        {/* Notifications */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <HiBell className="w-5 h-5 mr-2" /> Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Urgent Reports</p>
                <p className="text-sm text-gray-500">Get notified when urgent report is submitted</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Inactive Leaders</p>
                <p className="text-sm text-gray-500">Alert if a leader hasn’t reported in 7 days</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Weekly Digest</p>
                <p className="text-sm text-gray-500">Receive a summary every Monday</p>
              </div>
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <HiShieldCheck className="w-5 h-5 mr-2" /> Security
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-800">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Currently enabled via SMS</p>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
              Change Password
            </button>
          </div>
        </section>
      </div>
    </>
  );
}