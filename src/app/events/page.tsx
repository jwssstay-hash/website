'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { CalendarX2, CalendarDays, MapPin, Phone, Loader2 } from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-woodside-950">
      <Navbar />
      
      {/* Video Background fixed behind the page content */}
      <VideoBackground />

      <div className="flex-grow flex flex-col pt-32 pb-24 relative z-10 container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
            Upcoming Events
          </h2>
          <p className="text-woodside-200 font-sans tracking-widest uppercase text-sm drop-shadow-md">
            Join the community at Woodside Serene
          </p>
        </div>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-woodside-200 animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-woodside-950/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto w-full animate-fade-in">
            <div className="bg-white/10 p-5 rounded-full mb-6">
              <CalendarX2 className="text-woodside-200 w-12 h-12" />
            </div>
            <h3 className="text-3xl font-serif text-white mb-4">No Upcoming Events</h3>
            <p className="text-woodside-200 font-light text-lg">
              We are currently planning our next exciting events. Please check back later or subscribe to our newsletter to get notified!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {events.map((event, index) => (
              <div key={event.id} className="bg-woodside-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:bg-woodside-900/80 transition-all hover:-translate-y-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                {event.image ? (
                  <div className="relative h-64 overflow-hidden">
                    <img src={event.image} alt="Event Poster" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-woodside-950 to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="h-48 bg-woodside-800 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-woodside-700/50 to-woodside-900"></div>
                    <CalendarDays className="w-16 h-16 text-woodside-400/50 z-10" />
                  </div>
                )}
                
                <div className="p-8 flex-grow flex flex-col relative z-10 -mt-12">
                  <div className="bg-woodside-950 border border-white/10 rounded-2xl p-4 shadow-xl mb-6 flex justify-center">
                    <h4 className="font-bold text-white text-center tracking-widest uppercase text-sm">
                      {event.date || 'Date TBD'}
                    </h4>
                  </div>
                  
                  <p className="text-woodside-200 mb-6 flex-grow leading-relaxed">
                    {event.description || 'Join us for this exciting event at Woodside Serene.'}
                  </p>
                  
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {event.posterPlace && (
                      <div className="flex items-center gap-3 text-sm text-woodside-300">
                        <MapPin className="w-4 h-4 text-white" />
                        <span>{event.posterPlace}</span>
                      </div>
                    )}
                    {event.contact && (
                      <div className="flex items-center gap-3 text-sm text-woodside-300">
                        <Phone className="w-4 h-4 text-white" />
                        <span>{event.contact}</span>
                      </div>
                    )}
                  </div>
                  
                  <a href={`/booking?category=Event&stay=${encodeURIComponent(event.posterPlace || 'Special Event')}`} className="mt-6 w-full bg-white text-woodside-950 font-bold py-3 rounded-xl hover:bg-woodside-100 transition-colors shadow-lg text-center flex items-center justify-center">
                    Book this Event
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
