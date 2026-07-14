'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { VideoBackground } from '@/components/ui/VideoBackground';

const categories = [
  { name: 'Tent Stay', image: '/Images/Camp/Main.jpeg', description: 'Experience the raw beauty of nature' },
  { name: 'Room Stay', image: '/Images/Glass Room/Main.jpeg', description: 'Premium comfort and luxury amenities' }
] as const;

const subStays: Record<string, any[]> = {
  'Tent Stay': [
    { name: 'Camp Tent', image: '/Images/Camp/Main.jpeg', tariff: '', capacity: '2 Adults' },
    { name: 'Family Tent', image: '/Images/Family tent/Main.jpeg', tariff: '', capacity: '4 Adults + 1 Kid' }
  ],
  'Room Stay': [
    { name: 'Glass House', image: '/Images/Glass Room/Main.jpeg', tariff: '', capacity: 'Up to 10 Guests' },
    { name: 'Cottages', image: '/Images/Cottage Rooms/Main.jpeg', tariff: '', capacity: '2-3 Guests' }
  ]
};

export function Booking() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const stay = searchParams.get('stay');
  
  const step = stay ? 'form' : (category ? 'stay' : 'category');
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '2', stayType: stay || ''
  });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

      await addDoc(collection(db, 'bookings'), {
        ...formData,
        stayType: stay, // Use URL stay parameter
        createdAt: serverTimestamp()
      });

      const message = `Hello Woodside Serene! I would like to request a booking:\n\n*Name:* ${formData.name}\n*${category === 'Event' ? 'Event' : 'Stay'} Type:* ${stay}\n*Dates:* ${formData.checkIn} to ${formData.checkOut}\n*Guests:* ${formData.guests}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n\nPlease confirm availability and send the 50% advance payment details.`;
      const whatsappUrl = `https://wa.me/919840741075?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '2', stayType: stay || '' });
      
      setTimeout(() => { 
        setStatus('idle'); 
        window.location.href = '/booking';
      }, 5000);
      
    } catch (error) {
      console.error("Error saving booking: ", error);
      alert("There was an issue saving your booking. Please try again.");
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative w-full pt-10 min-h-screen pb-24">
      <VideoBackground />
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">Book Your Stay</h2>
          <p className="text-woodside-200 max-w-2xl mx-auto drop-shadow-md">
            {step === 'category' && "Select your preferred style of stay."}
            {step === 'stay' && `Choose your perfect ${category}.`}
            {step === 'form' && "Complete your booking request below."}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* STEP 1: CATEGORY SELECTION */}
          {step === 'category' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fade-in-up">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href={`?category=${encodeURIComponent(c.name)}`}
                  className="group relative h-80 md:h-[400px] rounded-3xl overflow-hidden text-left shadow-2xl block w-full outline-none ring-offset-woodside-950 focus:ring-4 focus:ring-woodside-600"
                >
                  <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-woodside-950 via-woodside-950/40 to-transparent opacity-80 md:group-hover:opacity-90 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none z-10">
                    <h3 className="text-3xl font-serif text-white mb-2">{c.name}</h3>
                    <p className="text-woodside-200">{c.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* STEP 2: STAY TYPE SELECTION */}
          {step === 'stay' && category && (
            <div className="animate-fade-in-up">
              <Link 
                href="/booking"
                className="mb-6 flex items-center gap-2 text-woodside-200 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest w-fit drop-shadow-md bg-woodside-950/50 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Categories
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {subStays[category] && subStays[category].map((s) => (
                  <Link
                    key={s.name}
                    href={`?category=${encodeURIComponent(category)}&stay=${encodeURIComponent(s.name)}`}
                    className="group relative h-80 md:h-[400px] rounded-3xl overflow-hidden text-left shadow-2xl block w-full outline-none ring-offset-woodside-950 focus:ring-4 focus:ring-woodside-600"
                  >
                    <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-woodside-950 via-woodside-950/40 to-transparent opacity-80 md:group-hover:opacity-90 transition-opacity pointer-events-none" />
                    <div className="absolute top-6 right-6 bg-woodside-800/80 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-wider uppercase pointer-events-none z-10">
                      {s.capacity}
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end pointer-events-none z-10">
                      <div>
                        <h3 className="text-3xl font-serif text-white mb-1">{s.name}</h3>
                        <p className="text-woodside-300 font-medium">{s.tariff}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <ChevronLeft className="w-5 h-5 text-white rotate-180" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: BOOKING FORM */}
          {step === 'form' && stay && category && (
            <div className="animate-fade-in-up">
              <Link 
                href={category === 'Event' ? '/events' : `?category=${encodeURIComponent(category)}`}
                className="mb-6 flex items-center gap-2 text-woodside-200 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest w-fit drop-shadow-md bg-woodside-950/50 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" /> Back to {category === 'Event' ? 'Events' : category}
              </Link>
              
              <div className="bg-woodside-950/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">Booking: <span className="text-woodside-300">{stay}</span></h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-woodside-300 uppercase mb-1">Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-woodside-950/50 border border-white/10 text-white focus:outline-none focus:border-woodside-500 focus:ring-1 focus:ring-woodside-500 placeholder-white/30" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-woodside-300 uppercase mb-1">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-woodside-950/50 border border-white/10 text-white focus:outline-none focus:border-woodside-500 focus:ring-1 focus:ring-woodside-500 placeholder-white/30" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-woodside-300 uppercase mb-1">Phone</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-woodside-950/50 border border-white/10 text-white focus:outline-none focus:border-woodside-500 focus:ring-1 focus:ring-woodside-500 placeholder-white/30" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-woodside-300 uppercase mb-1">Check-in</label>
                      <input required type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-woodside-950/50 border border-white/10 text-white focus:outline-none focus:border-woodside-500 focus:ring-1 focus:ring-woodside-500 [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-woodside-300 uppercase mb-1">Check-out</label>
                      <input required type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-woodside-950/50 border border-white/10 text-white focus:outline-none focus:border-woodside-500 focus:ring-1 focus:ring-woodside-500 [color-scheme:dark]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-woodside-300 uppercase mb-1">Guests</label>
                    <select name="guests" value={formData.guests} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-woodside-950/50 border border-white/10 text-white focus:outline-none focus:border-woodside-500 focus:ring-1 focus:ring-woodside-500">
                      <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4+ Guests</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-white text-woodside-950 hover:bg-gray-100 font-bold py-4 rounded-xl mt-6 transition-colors shadow-lg shadow-white/10 active:scale-[0.98]">
                    {status === 'loading' ? 'Sending Request...' : 'Send WhatsApp Request'}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
