// app/leader/submit-report/page.tsx

'use client'; // ✅ This line fixes the error

import { HiClipboardList, HiExclamation, HiHeart, HiDocumentText, HiPhotograph } from 'react-icons/hi';
import { useState } from 'react';

export default function SubmitReportPage() {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');

  const categories = [
    { id: 'academic', label: 'Academic', icon: HiDocumentText, color: 'blue' },
    { id: 'fellowship', label: 'Fellowship', icon: HiHeart, color: 'green' },
    { id: 'need', label: 'Student Need', icon: HiExclamation, color: 'red' },
    { id: 'event', label: 'Event Update', icon: HiClipboardList, color: 'purple' },
    { id: 'other', label: 'Other', icon: HiDocumentText, color: 'gray' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <a href="/leader/dashboard" className="text-blue-600 text-sm font-medium mb-4 inline-block">
          ← Back to Dashboard
        </a>
        <h1 className="text-xl font-semibold text-gray-800">Submit Report</h1>
        <p className="text-sm text-gray-600">Share what’s happening on campus</p>
      </header>

      <main className="p-6">
        <form className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 border-2 rounded-xl text-center transition ${
                      category === cat.id
                        ? `border-${cat.color}-500 bg-${cat.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 text-${cat.color}-600`} />
                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low – Just sharing</option>
              <option value="medium">Medium – Should be aware</option>
              <option value="high">High – Needs attention</option>
              <option value="urgent">Urgent – Immediate action needed</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Description</label>
            <textarea
              rows={5}
              placeholder="Describe what’s happening... (e.g., 'Many students stressed before exams')"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Add Photo (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition">
              <HiPhotograph className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drag & drop or click to upload image</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!category}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition"
          >
            Submit Report
          </button>
        </form>
      </main>
    </div>
  );
}