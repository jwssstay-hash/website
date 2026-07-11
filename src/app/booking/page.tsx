import { Suspense } from 'react';
import { Booking } from "@/components/sections/BookingFlow";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export default function BookingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-woodside-950">
      <Navbar />
      <div className="flex-grow flex flex-col pt-24 pb-12">
        <Suspense fallback={<div className="flex-grow flex items-center justify-center text-white">Loading...</div>}>
          <Booking />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
