// app/page.tsx

import LandingHeader from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowToWorks';
import CTA from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}