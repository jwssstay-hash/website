import { Gallery } from "@/components/sections/Gallery";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Discover Woodside Serene",
  description: "View stunning photos of our luxury tents, premium glass houses, and the breathtaking nature of Jawadhu Hills.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-woodside-950">
      <Navbar />
      <div className="flex-grow flex flex-col pt-24 pb-12">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
