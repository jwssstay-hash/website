'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Carousel_003 } from '../ui/Carousel';
import { NativeCarousel } from '../ui/NativeCarousel';

const farmImages = [
  { src: "/Images/General Farm Photos/general-farm-photos-33.jpeg", alt: "Woodside Serene Property" },
  { src: "/Images/General Farm Photos/general-farm-photos-34.jpeg", alt: "Woodside Serene View" },
  { src: "/Images/General Farm Photos/general-farm-photos-35.jpeg", alt: "Woodside Serene View" },
  { src: "/Images/General Farm Photos/general-farm-photos-36.jpeg", alt: "Woodside Serene View" },
  { src: "/Images/General Farm Photos/general-farm-photos-37.jpeg", alt: "Woodside Serene View" },
  { src: "/Images/General Farm Photos/general-farm-photos-38.jpeg", alt: "Woodside Serene View" },
  { src: "/Images/General Farm Photos/general-farm-photos-39.jpeg", alt: "Woodside Serene Outdoors" },
  { src: "/Images/General Farm Photos/general-farm-photos-40.jpeg", alt: "Woodside Serene Outdoors" },
  { src: "/Images/General Farm Photos/general-farm-photos-41.jpeg", alt: "Woodside Serene Night" },
  { src: "/Images/General Farm Photos/general-farm-photos-42.jpeg", alt: "Woodside Serene Night" },
];

export function About() {
  return (
    <section 
      id="about" 
      className="py-24 md:py-32 relative overflow-hidden bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")'
      }}
    >
      {/* Grass Overlay */}
      <img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png"
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none"
        alt=""
      />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-woodside-900 mb-6 tracking-wide drop-shadow-sm">
            Farm Stay
          </h2>
          <p 
            className="animate-fade-up text-lg md:text-xl font-sans text-woodside-800/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm"
            style={{ animationDelay: '200ms' }}
          >
            Nestled in the heart of the pristine Jawadhu Hills, Woodside Serene is a premium retreat designed for those who seek to disconnect from the chaos and reconnect with nature, without compromising on luxury.
          </p>
          <div 
            className="animate-fade-up w-16 h-[2px] bg-woodside-900/40 mx-auto mt-10 mb-16 origin-center"
            style={{ animationDelay: '400ms' }}
          ></div>
        </div>

        {/* Feature Images Carousel */}
        <div className="mt-10 md:mt-20 w-full overflow-hidden">
          <div className="hidden md:block">
            <Carousel_003 
              images={farmImages} 
              showPagination={true} 
              showNavigation={true} 
              autoplay={true} 
              loop={true} 
            />
          </div>
          <div className="block md:hidden relative z-20">
            <NativeCarousel images={farmImages} />
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex justify-center px-4 relative z-20">
          <div className="grid grid-cols-3 gap-3 md:gap-8 w-full max-w-4xl">
            <div className="group text-center bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl rounded-2xl py-6 px-2 md:py-8 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2">
              <p className="text-2xl md:text-5xl font-serif text-woodside-900 font-extrabold mb-1 md:mb-3 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">5+</p>
              <p className="text-[9px] md:text-sm font-bold tracking-widest uppercase text-woodside-900/90">Acres of Nature</p>
            </div>
            <div className="group text-center bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl rounded-2xl py-6 px-2 md:py-8 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2">
              <p className="text-2xl md:text-5xl font-serif text-woodside-900 font-extrabold mb-1 md:mb-3 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">24/7</p>
              <p className="text-[9px] md:text-sm font-bold tracking-widest uppercase text-woodside-900/90">Service</p>
            </div>
            <div className="group text-center bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl rounded-2xl py-6 px-2 md:py-8 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2">
              <p className="text-2xl md:text-5xl font-serif text-woodside-900 font-extrabold mb-1 md:mb-3 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">100%</p>
              <p className="text-[9px] md:text-sm font-bold tracking-widest uppercase text-woodside-900/90">Organic</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
