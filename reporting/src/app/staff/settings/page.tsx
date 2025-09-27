'use client';

import { HiUser, HiBell, HiShieldCheck, HiSave, HiLogout } from 'react-icons/hi';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    urgent: true,
    digest: false,
    sms: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 px-6 py-8">
        <button className="text-indigo-600 text-sm font-medium mb-4 inline-block">
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account & preferences</p>
      </header>

      <main className="p-6 space-y-8 max-w-3xl mx-auto">
        {/* Profile */}
        <section className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <HiUser className="w-5 h-5 text-indigo-600" />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Meron Tesfaye"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="meron@unity.edu.et"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                defaultValue="+251 911 234 567"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition flex items-center">
              <HiSave className="w-4 h-4 mr-2" /> Save Changes
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <HiBell className="w-5 h-5 text-indigo-600" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">Urgent Reports</p>
                <p className="text-sm text-gray-500">When staff responds or crisis arises</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.urgent}
                onChange={() => setNotifications({ ...notifications, urgent: !notifications.urgent })}
                className="sr-only"
              />
              <div className={`relative w-11 h-6 rounded-full transition ${notifications.urgent ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <div
                  className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                    notifications.urgent ? 'translate-x-5' : ''
                  }`}
                ></div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">Weekly Digest</p>
                <p className="text-sm text-gray-500">Summary every Monday</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.digest}
                onChange={() => setNotifications({ ...notifications, digest: !notifications.digest })}
                className="sr-only"
              />
              <div className={`relative w-11 h-6 rounded-full transition ${notifications.digest ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <div
                  className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                    notifications.digest ? 'translate-x-5' : ''
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <HiShieldCheck className="w-5 h-5 text-indigo-600" />
            Security
          </h2>
          <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
            <HiLogout className="w-4 h-4" />
            Change Password
          </button>
        </section>
      </main>
    </div>
  );
}