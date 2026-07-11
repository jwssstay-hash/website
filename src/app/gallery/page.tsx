import { Gallery } from "@/components/sections/Gallery";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

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
