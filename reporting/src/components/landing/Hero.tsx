// app/components/landing/Hero.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Image imports (replace with your actual images)
// You can use public folder: /images/hero1.jpg
const heroImages = [
  '/evasue1.jpg', // Campus fellowship
  '/evasue2.jpg', // Prayer meeting
  '/evasue3.jpg', // Bible study
  '/evasue4.jpg', // Leadership training
];


export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${img})`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-700/80 via-sky-900/80 to-sky-600/80"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fadeIn">
            Fellowship in Christ, <br />
            <span className="text-red-200 drop-shadow-lg">Growth in Truth</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-300">
            EvaSUE is a Christ-centered fellowship of students and graduates, united in prayer, Bible study, and witness. 
            We grow together in love, serve with purpose, and advance God’s Kingdom across campuses in Ethiopia and beyond.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn delay-500">
            <Link
              href="/auth/signup"
              className="bg-gradient-to-r from-red-600 to-pink-700 text-white px-8 py-3 rounded-2xl hover:from-red-500 hover:to-pink-600 transition shadow-2xl hover:shadow-3xl font-medium transform hover:scale-105"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}