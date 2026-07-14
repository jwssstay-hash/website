import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Footer } from '@/components/ui/Footer';

// Define the mapping from slug to actual folder name in public/Images
const stayMap: Record<string, { title: string; folder: string; description: string }> = {
  'camp-tent': {
    title: 'Camp Tent',
    folder: 'Camp',
    description: 'The camp tent is 4.5 ft height at entrance and 6/6.5 ft length and breadth. It can accommodate 2 adults. All guests will be served with a complimentary South Indian veg breakfast. 1 Exclusive rest room will be provided per booking. Additional rest rooms will be based on the number of guests.',
  },
  'family-tent': {
    title: 'Family Tent',
    folder: 'Family tent',
    description: 'This Family tent can accommodate 4 adults and 1 kid. A fan, light and a rest room will be allotted for this booking. 4 mattresses will be placed inside the tent. Blankets and pillows will be provided. A max of 6 adults can stay. All guests will be served with a complimentary South Indian veg breakfast.',
  },
  'glass-house': {
    title: 'Glass House',
    folder: 'Glass Room',
    description: 'This room is an 800 Sq ft room with 2 Attached restrooms and dressing area. It can accommodate upto 10 guests. Single cots will be provided to the guests. All guests will be served with a complimentary South Indian veg breakfast.',
  },
  'cottages': {
    title: 'Cottages',
    folder: 'Cottage Rooms',
    description: 'There are 2 cottages available. Each cottage is 350 sqft, Air conditioned with king size cot and mattress. 2 guests with an additional guest can stay in a cottage. A cot with mattress will be provided for additional guest. All guests will be served with complimentary South Indian veg breakfast.',
  },
};

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const stay = stayMap[resolvedParams.slug];

  if (!stay) {
    notFound();
  }

  // Read the images from the filesystem
  const imagesDirectory = path.join(process.cwd(), 'public', 'Images', stay.folder);
  let images: string[] = [];

  try {
    const filenames = fs.readdirSync(imagesDirectory);
    // Filter out non-image files if any, and map to public URL path
    images = filenames
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((name) => `/Images/${stay.folder}/${name}`);
  } catch (error) {
    console.error(`Error reading directory for ${stay.title}:`, error);
  }

  return (
    <div className="min-h-screen bg-woodside-950 flex flex-col">
      {/* Header/Nav */}
      <header className="w-full p-6 md:p-8 flex items-center justify-between sticky top-0 z-50 bg-woodside-950/80 backdrop-blur-md border-b border-woodside-800/50">
        <Link href="/#stays" className="flex items-center gap-2 text-woodside-100 hover:text-white transition-colors group">
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium tracking-wider uppercase text-sm">Back to Stays</span>
        </Link>
        <Link href="/booking" className="bg-woodside-700 hover:bg-woodside-600 text-white px-6 py-2 rounded-full font-bold tracking-wider uppercase text-sm transition-colors shadow-lg">
          Book Now
        </Link>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-sm">{stay.title}</h1>
        <p className="text-woodside-200 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12">
          {stay.description}
        </p>

        <div className="bg-woodside-900/60 backdrop-blur-sm border border-woodside-800 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto text-left shadow-2xl flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-woodside-100 font-bold uppercase tracking-wider text-sm mb-4 border-b border-woodside-800 pb-2">Booking Info</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              On payment of at least <strong className="text-white">50% advance</strong> and confirming your booking, you can request for a Camp fire and pre-book your meals (veg and non-veg).
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-woodside-100 font-bold uppercase tracking-wider text-sm mb-4 border-b border-woodside-800 pb-2">Places to Visit Nearby</h3>
            <ul className="text-white/80 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Kolappan lake</li>
              <li>Bheeman water falls</li>
              <li>Vyni Bappu observatory</li>
              <li>Andiappanur Dam</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 md:px-8 pb-24 w-full flex-1">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {images.map((imagePath, index) => (
            <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-2xl bg-woodside-900 border border-woodside-800/30">
              <img
                src={imagePath}
                alt={`${stay.title} image ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
