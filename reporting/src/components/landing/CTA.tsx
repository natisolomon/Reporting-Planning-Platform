// app/components/landing/CTA.tsx

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-sky-600 to-sky-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Fellowship</h2>
        <p className="text-lg text-blue-100 mb-8">
          {"Whether you're a student, graduate, or leader, there's a place for you in God’s family"}.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="border border-white/50 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition font-medium text-sm min-w-[160px]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}