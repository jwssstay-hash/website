import React from 'react';
import { Users, Bath, Coffee, Check, Star } from 'lucide-react';
import Link from 'next/link';
import { StickyCard001 } from '../ui/StickyCard001';

const stays = [
  {
    title: "Camp Tent",
    slug: "camp-tent",
    description: "The camp tent is 4.5 ft height at entrance and 6/6.5 ft length and breadth.",
    image: "/Images/Camp/Main.jpeg",
    capacity: "2 Adults",
    price: "₹1500 / Guest",
    badge: "",
    features: [
      "Accommodates 2 adults",
      "₹1500/guest >12, 50% for ages 6-12 (Below 6 free)",
      "Complimentary South Indian veg breakfast",
      "1 Exclusive restroom per booking"
    ],
    icons: [<Users key="1" size={20}/>, <Bath key="2" size={20}/>, <Coffee key="3" size={20}/>]
  },
  {
    title: "Family Tent",
    slug: "family-tent",
    description: "Spacious family camping experience with 4 mattresses placed inside the tent.",
    image: "/Images/Family tent/Main.jpeg",
    capacity: "4 Adults + 1 Kid",
    price: "₹5000 / Booking",
    badge: "Family Friendly",
    features: [
      "Accommodates up to 6 adults max",
      "₹5000 charged for 4 adults and 1 kid",
      "Fan, light, blankets, and pillows provided",
      "Complimentary South Indian veg breakfast"
    ],
    icons: [<Users key="1" size={20}/>, <Bath key="2" size={20}/>, <Coffee key="3" size={20}/>]
  },
  {
    title: "Glass House",
    slug: "glass-house",
    description: "This is an 800 sq ft room with 2 attached restrooms and dressing area.",
    image: "/Images/Glass Room/Main.jpeg",
    capacity: "Up to 10 Guests",
    price: "₹1500 / Guest",
    badge: "Group Stay",
    features: [
      "Accommodates up to 10 guests (Single cots provided)",
      "₹1500/guest >12, 50% for ages 6-12 (Below 6 free)",
      "2 Attached restrooms & dressing area",
      "Complimentary South Indian veg breakfast"
    ],
    icons: [<Star key="1" size={20}/>, <Users key="2" size={20}/>, <Bath key="3" size={20}/>]
  },
  {
    title: "Cottages",
    slug: "cottages",
    description: "Each cottage is 350 sq ft, air-conditioned with a king size cot and mattress.",
    image: "/Images/Cottage Rooms/Main.jpeg",
    capacity: "2-3 Guests",
    price: "₹5000 / Cottage",
    badge: "Premium Stay",
    features: [
      "₹5000 per cottage for 2 adults",
      "Additional Rs1000 for one extra guest",
      "Air-conditioned with king size cot",
      "Complimentary South Indian veg breakfast"
    ],
    icons: [<Check key="1" size={20}/>, <Bath key="2" size={20}/>, <Coffee key="3" size={20}/>]
  }
];

export function StayTypes() {
  return (
    <section 
      id="stays" 
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")'
      }}
    >
      {/* Grass Overlay */}
      <img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png"
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none opacity-50"
        alt=""
      />
      <div className="container mx-auto px-6 md:px-12 relative z-20 pt-24 md:pt-32">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-woodside-900 mb-4 drop-shadow-sm">
            Curated Stays
          </h2>
          <p className="text-woodside-900/90 font-bold tracking-widest uppercase text-sm drop-shadow-sm">
            Find your perfect escape
          </p>
        </div>
      </div>

      <div className="relative z-20">
        <StickyCard001 
          cards={stays.map((stay, idx) => (
            <div
              key={idx}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-2xl h-full w-full flex flex-col md:flex-row"
            >
              <Link href={`/stays/${stay.slug}`} className="relative h-1/2 md:h-full md:w-1/2 overflow-hidden group shrink-0 block">
                <img 
                  src={stay.image} 
                  alt={stay.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {stay.badge && (
                  <div className="absolute top-4 right-4 md:left-4 md:right-auto bg-woodside-800/90 backdrop-blur-sm text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg">
                    {stay.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-woodside-950/80 via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                  <h3 className="text-3xl font-serif text-white">{stay.title}</h3>
                </div>
              </Link>
              
              <div className="flex flex-col h-1/2 md:h-full md:w-1/2 relative">
                <div className="p-6 md:p-10 flex-1 overflow-y-auto hide-scroll pb-24 md:pb-24">
                  <div className="flex justify-between items-start mb-6">
                    <p className="text-woodside-900 font-medium text-lg leading-relaxed flex-1">{stay.description}</p>
                    <p className="text-woodside-900 font-serif text-xl font-bold whitespace-nowrap ml-4">{stay.price}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {stay.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-woodside-700 shrink-0 mt-0.5" />
                        <span className="text-woodside-900/90 font-medium text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 md:px-10 md:py-6 border-t border-woodside-900/20 flex justify-between items-center shrink-0 bg-white/50 backdrop-blur-xl">
                  <div className="flex gap-4 text-woodside-800">
                    {stay.icons}
                  </div>
                  <Link href={`/stays/${stay.slug}`} className="text-sm md:text-base font-bold tracking-wider uppercase text-woodside-900 hover:text-woodside-700 transition-colors underline underline-offset-4">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        />
      </div>
    </section>
  );
}
