// app/staff/leaders/components/AddLeaderModal.tsx
'use client';

import { useState } from 'react';
import { HiX, HiUser, HiOfficeBuilding, HiLocationMarker, HiPhone, HiMail, HiCheckCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface LeaderFormData {
  name: string;
  campus: string;
  subRegion: string;
  phone: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface AddLeaderModalProps {
  onClose: () => void;
  onAdd: (leader: Omit<LeaderFormData, 'status'>) => void;
}

export default function AddLeaderModal({ onClose, onAdd }: AddLeaderModalProps) {
  const [formData, setFormData] = useState<LeaderFormData>({
    name: '',
    campus: '',
    subRegion: '',
    phone: '',
    email: '',
    role: 'Campus Leader',
    status: 'active'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeaderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    'Campus Leader',
    'Department Leader',
    'Small Group Leader',
    'Event Coordinator'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LeaderFormData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.campus.trim()) newErrors.campus = 'Campus is required';
    if (!formData.subRegion.trim()) newErrors.subRegion = 'Sub-region is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LeaderFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAdd({
      name: formData.name,
      campus: formData.campus,
      subRegion: formData.subRegion,
      phone: formData.phone,
      email: formData.email,
      role: formData.role
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <HiUser className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Leader</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <HiX className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <HiUser className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.name 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                  placeholder="Enter leader's full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <HiX className="w-4 h-4" /> {errors.name}
                </p>
              )}
            </div>

            {/* Campus & Sub-Region */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Campus *
                </label>
                <div className="relative">
                  <HiOfficeBuilding className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.campus 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
                    }`}
                    placeholder="Enter campus name"
                  />
                </div>
                {errors.campus && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <HiX className="w-4 h-4" /> {errors.campus}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Sub-Region *
                </label>
                <div className="relative">
                  <HiLocationMarker className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subRegion"
                    value={formData.subRegion}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.subRegion 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
                    }`}
                    placeholder="Enter sub-region"
                  />
                </div>
                {errors.subRegion && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <HiX className="w-4 h-4" /> {errors.subRegion}
                  </p>
                )}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.phone 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
                    }`}
                    placeholder="+251 911 234 567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <HiX className="w-4 h-4" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
                    }`}
                    placeholder="leader@campus.edu.et"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <HiX className="w-4 h-4" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <HiCheckCircle className="w-5 h-5" />
                    Add Leader
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}