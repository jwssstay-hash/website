'use client';

import React, { useEffect, useState } from 'react';
import { ZoomIn, Loader2 } from 'lucide-react';
import { VideoBackground } from '../ui/VideoBackground';

const defaultGalleryImages = [
  { src: "/Images/Family tent/family-tent-32.jpeg", title: "Family Tent", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-8.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-54.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/General Farm Photos/general-farm-photos-39.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-47.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Cottage Rooms/cottage-rooms-10.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-36.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Family tent/family-tent-30.jpeg", title: "Family Tent", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Cottage Rooms/Main.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Cottage Rooms/cottage-rooms-11.jpeg", title: "Cottage Rooms", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-50.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-34.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/Main.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-24.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-7.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-6.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Camp/events-and-camp-16.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-22.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-20.jpeg", title: "Camp", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Cottage Rooms/cottage-rooms-9.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-56.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-33.jpeg", title: "General Farm Photos", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Glass Room/Main.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-45.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Family tent/family-tent-25.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/General Farm Photos/general-farm-photos-42.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Family tent/family-tent-27.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-49.jpeg", title: "Glass Room", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-21.jpeg", title: "Camp", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Glass Room/glass-house-group-stay-52.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-3.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Family tent/family-tent-28.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-58.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-48.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-2.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-5.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-41.jpeg", title: "General Farm Photos", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-55.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-17.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-51.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/General Farm Photos/general-farm-photos-40.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Glass Room/glass-house-group-stay-57.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/General Farm Photos/general-farm-photos-38.jpeg", title: "General Farm Photos", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Family tent/family-tent-31.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Family tent/family-tent-26.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-23.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-37.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-53.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-4.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-19.jpeg", title: "Camp", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Cottage Rooms/cottage-rooms-12.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-35.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-15.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-44.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-46.jpeg", title: "Glass Room", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-14.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Family tent/Main.jpeg", title: "Family Tent", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Camp Tent And Restroom/camp-tent-and-restroom-1.jpeg", title: "Camp Tent And Restroom", colSpan: "col-span-1", rowSpan: "row-span-1" },
];

export function Gallery() {
  const [galleryImages, setGalleryImages] = useState<any[]>(defaultGalleryImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomGallery = async () => {
      try {
        const { db } = await import('@/lib/firebase');
        const { collection, query, orderBy, getDocs } = await import('firebase/firestore');

        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const customImages = snapshot.docs.map(doc => ({
          src: doc.data().src,
          title: doc.data().title || 'Gallery Image',
          colSpan: doc.data().colSpan || 'col-span-1',
          rowSpan: doc.data().rowSpan || 'row-span-1'
        }));
        
        // Prepend new custom images to the hardcoded default ones
        setGalleryImages([...customImages, ...defaultGalleryImages]);
      } catch (error) {
        console.error("Error fetching custom gallery images", error);
      }
      setIsLoading(false);
    };

    fetchCustomGallery();
  }, []);

  return (
    <section id="gallery" className="relative w-full pt-10 min-h-screen pb-24">
      <VideoBackground />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
            Gallery
          </h2>
          <p className="text-woodside-200 font-sans tracking-widest uppercase text-sm drop-shadow-md">
            Moments at Woodside Serene
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-12 h-12 text-woodside-300 animate-spin" />
          </div>
        ) : (
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group/slider">
            <div className="flex overflow-x-auto snap-x snap-mandatory h-[60vh] md:h-[75vh] w-full hide-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative shrink-0 w-full h-full snap-center flex items-center justify-center bg-woodside-950"
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-woodside-950/90 to-transparent pointer-events-none">
                    <span className="text-white font-serif text-2xl tracking-wide">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <div className="bg-woodside-950/50 backdrop-blur-md text-white/50 p-2 rounded-full pointer-events-auto cursor-pointer hover:bg-woodside-900 hover:text-white transition-colors" onClick={(e) => {
                const container = e.currentTarget.parentElement?.previousElementSibling;
                if (container) container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
              }}>
                <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <div className="bg-woodside-950/50 backdrop-blur-md text-white/50 p-2 rounded-full pointer-events-auto cursor-pointer hover:bg-woodside-900 hover:text-white transition-colors" onClick={(e) => {
                const container = e.currentTarget.parentElement?.previousElementSibling?.previousElementSibling;
                if (container) container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
              }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
            
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}
