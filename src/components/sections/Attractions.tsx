import React from 'react';
import { MapPin } from 'lucide-react';

const attractions = [
  {
    name: "Beeman Falls",
    distance: "30 Mins",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80",
    desc: "A breathtaking waterfall hidden deep within the forest."
  },
  {
    name: "Kavalur Observatory",
    distance: "25 Mins",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    desc: "Asia's largest telescope observatory. Perfect for stargazing."
  },
  {
    name: "Amirthi Zoological Park",
    distance: "45 Mins",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80",
    desc: "A beautiful park featuring rich flora, fauna and waterfalls."
  },
  {
    name: "Komutteri Lake",
    distance: "15 Mins",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80",
    desc: "A serene boating lake surrounded by misty hills."
  }
];

export function Attractions() {
  return (
    <section id="attractions" className="py-24 relative overflow-hidden bg-woodside-950">
      {/* Absolute localized video background */}
      <div className="absolute inset-0 z-0">
        <video
          muted
          playsInline
          autoPlay
          loop
          className="absolute w-full h-full object-cover opacity-60"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        />
        <div className="absolute inset-0 bg-woodside-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-woodside-950 via-transparent to-woodside-950" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
            Places to Visit
          </h2>
          <p className="text-woodside-200 font-sans tracking-widest uppercase text-sm drop-shadow-md">
            Explore Jawadhu Hills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((place, idx) => (
            <div
              key={idx}
              className="bg-woodside-800 rounded-2xl overflow-hidden group shadow-lg"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-woodside-950/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs text-white">
                  <MapPin size={12} />
                  {place.distance}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-white mb-2">{place.name}</h3>
                <p className="text-sm font-sans text-woodside-50/80 leading-relaxed">{place.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
