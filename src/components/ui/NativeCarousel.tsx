"use client";

import React, { useEffect, useRef } from "react";

export interface NativeCarouselProps {
  images: { src: string; alt: string; title?: string }[];
}

export const NativeCarousel = ({ images }: NativeCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Calculate the width of one slide roughly (85% of container width + 16px gap)
        const slideWidth = clientWidth * 0.85 + 16;
        
        // Check if we reached the end (with a 20px buffer for rounding errors)
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 20;
        
        // iOS Safari famously blocks JS smooth scrolling if scroll-snap is active!
        // We must temporarily disable snapping, scroll, and re-enable it.
        scrollRef.current.style.scrollSnapType = 'none';
        
        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
        }
        
        // Re-enable scroll-snap after the smooth scroll finishes (approx 500ms)
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.style.scrollSnapType = 'x mandatory';
          }
        }, 600);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-12 pt-4 hide-scroll scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className="snap-center shrink-0 w-[85%] sm:w-[60%] h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl relative"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
