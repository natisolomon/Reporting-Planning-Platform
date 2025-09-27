// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'EvaSUE - Fellowship in Christ',
  description: 'A Christ-centered fellowship of students and graduates in Ethiopia and abroad.',
  icons: {
    icon: '/favicon.ico',
  },
};

//const EXCLUDED_PATHS = [ '/leader'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-800`}>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
      </body>
    </html>
  );
}