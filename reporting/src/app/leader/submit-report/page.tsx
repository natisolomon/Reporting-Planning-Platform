// app/leader/submit-report/page.tsx
'use client';

import { HiClipboardList, HiExclamation, HiHeart, HiDocumentText, HiPhotograph, HiChevronDown, HiArrowLeft } from 'react-icons/hi';
import { useState } from 'react'; // This imports React automatically in modern React
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubmitReportPage() {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const categories = [
    { id: 'academic', label: 'Academic', icon: HiDocumentText },
    { id: 'fellowship', label: 'Fellowship', icon: HiHeart },
    { id: 'need', label: 'Student Need', icon: HiExclamation },
    { id: 'event', label: 'Event Update', icon: HiClipboardList },
    { id: 'other', label: 'Other', icon: HiDocumentText },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low – Just sharing' },
    { value: 'medium', label: 'Medium – Should be aware' },
    { value: 'high', label: 'High – Needs attention' },
    { value: 'urgent', label: 'Urgent – Immediate action needed' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getPriorityColor = (value: string) => {
    switch (value) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-amber-600';
      case 'medium': return 'text-sky-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button - Mobile Optimized */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link 
          href="/leader/dashboard" 
          className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium transition-colors"
        >
          <HiArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Report</h1>
              <p className="text-gray-600">Share what’s happening on your campus</p>
            </motion.div>

            <form className="space-y-6 mt-8">
              {/* Category Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-300 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white transition-all"
                  >
                    <div className="flex items-center">
                      {category ? (
                        <>
                          {/* Render the icon component directly */}
                          {categories.find(c => c.id === category)?.icon({ 
                            className: "w-5 h-5 text-gray-600 mr-3" 
                          })}
                          <span className="text-gray-700">
                            {categories.find(c => c.id === category)?.label || 'Select category'}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">Select a category</span>
                      )}
                    </div>
                    <HiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setCategory(cat.id);
                              setIsCategoryOpen(false);
                            }}
                            className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            <cat.icon className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-gray-700">{cat.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Priority Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-2">Priority Level</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                    className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-300 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white transition-all"
                  >
                    <span className={`font-medium ${category ? getPriorityColor(priority) : 'text-gray-400'}`}>
                      {priorityOptions.find(p => p.value === priority)?.label || 'Select priority'}
                    </span>
                    <HiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPriorityOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isPriorityOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
                      >
                        {priorityOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setPriority(option.value);
                              setIsPriorityOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium text-gray-700">{option.label.split(' – ')[0]}</div>
                            <div className="text-sm text-gray-600">{option.label.split(' – ')[1]}</div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe what’s happening... (e.g., 'Many students stressed before exams, need prayer support')"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-all"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Be specific about whats happening and what kind of support you need.
                </p>
              </motion.div>

              {/* Photo Upload */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-800 mb-2">Add Photo (Optional)</label>
                <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-4 pb-2">
                    <HiPhotograph className="w-8 h-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 text-center px-4">
                      <span className="font-medium text-sky-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                
                <AnimatePresence>
                  {file && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-3 bg-sky-50 rounded-lg border border-sky-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <HiPhotograph className="w-5 h-5 text-sky-600" />
                          <div>
                            <p className="text-sm font-medium text-sky-800 truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-sky-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-sky-600 hover:text-sky-800 p-1"
                        >
                          <HiExclamation className="w-4 h-4 rotate-45" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={!category || !description.trim()}
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-sky-700 hover:to-sky-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Submit Report
                </button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Your report will be sent to your assigned staff member
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}