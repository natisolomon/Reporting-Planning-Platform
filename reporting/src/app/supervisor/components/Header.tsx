// app/super-staff/components/Header.tsx

import { HiBell } from 'react-icons/hi';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Central 1 Region</h2>
        <p className="text-sm text-gray-500">Monitoring 52 campuses across Piassa, Mexico, Phawulos</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition relative">
          <HiBell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          SS
        </div>
      </div>
    </header>
  );
}