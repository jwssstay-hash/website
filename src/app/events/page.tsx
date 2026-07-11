import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { CalendarX2 } from "lucide-react";

export default function EventsPage() {
  // In the future, this data will be fetched from an admin panel/database
  const events: any[] = []; 

  return (
    <main className="min-h-screen flex flex-col bg-woodside-950">
      <Navbar />
      
      {/* Video Background fixed behind the page content */}
      <VideoBackground />

      <div className="flex-grow flex flex-col pt-32 pb-12 relative z-10 container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
            Upcoming Events
          </h2>
          <p className="text-woodside-200 font-sans tracking-widest uppercase text-sm drop-shadow-md">
            Join the community at Woodside Serene
          </p>
        </div>

        {events.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-woodside-950/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-2xl mx-auto w-full">
            <div className="bg-white/10 p-4 rounded-full mb-6">
              <CalendarX2 className="text-woodside-200 w-12 h-12" />
            </div>
            <h3 className="text-2xl font-serif text-white mb-3">No Upcoming Events</h3>
            <p className="text-woodside-200 font-light text-lg">
              We are currently planning our next exciting events. Please check back later or subscribe to our newsletter to get notified!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event cards would map here */}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
