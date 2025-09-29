// app/components/landing/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">ES</span>
            </div>
            <span className="text-lg font-bold">EvaSUE</span>
          </div>
          <p className="text-gray-300 text-sm">
            A Christ-centered fellowship of students and graduates.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about/believe" className="hover:text-white transition">What We Believe</Link></li>
            <li><Link href="/about" className="hover:text-white transition">Who We Are</Link></li>
            <li><Link href="/about/history" className="hover:text-white transition">History</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Ministries</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/ministry/discipleship" className="hover:text-white transition">Discipleship</Link></li>
            <li><Link href="/ministry/leaders" className="hover:text-white transition">Leadership</Link></li>
            <li><Link href="/ministry/mission" className="hover:text-white transition">Mission & Evangelism</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/donate" className="hover:text-white transition">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/video" className="hover:text-white transition">Watch</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} EvaSUE. All rights reserved.</p>
      </div>
    </footer>
  );
}