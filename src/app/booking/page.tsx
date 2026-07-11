import { Suspense } from 'react';
import { Booking } from "@/components/sections/BookingFlow";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay | Luxury Glamping & Farm Stay",
  description: "Book your luxury tent, premium glass house, or family cottage at Woodside Serene Jawadhu Hills today.",
};

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
