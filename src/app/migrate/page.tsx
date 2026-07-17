'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const imagesToMigrate = [
  { src: "/Images/Glass Room/glass-house-group-stay-54.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/General Farm Photos/general-farm-photos-39.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Cottage Rooms/cottage-rooms-10.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-36.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Family tent/family-tent-30.jpeg", title: "Family Tent", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Cottage Rooms/Main.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Cottage Rooms/cottage-rooms-11.jpeg", title: "Cottage Rooms", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-50.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-34.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/Main.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-24.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-16.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-22.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-20.jpeg", title: "Camp", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Cottage Rooms/cottage-rooms-9.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-56.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-33.jpeg", title: "General Farm Photos", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Glass Room/Main.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Family tent/family-tent-25.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/General Farm Photos/general-farm-photos-42.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Family tent/family-tent-27.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-49.jpeg", title: "Glass Room", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-21.jpeg", title: "Camp", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Glass Room/glass-house-group-stay-52.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Family tent/family-tent-28.jpeg", title: "Family Tent", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-58.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
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
  { src: "/Images/Camp/events-and-camp-19.jpeg", title: "Camp", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { src: "/Images/Cottage Rooms/cottage-rooms-12.jpeg", title: "Cottage Rooms", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/General Farm Photos/general-farm-photos-35.jpeg", title: "General Farm Photos", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-15.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-44.jpeg", title: "Glass Room", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { src: "/Images/Glass Room/glass-house-group-stay-46.jpeg", title: "Glass Room", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { src: "/Images/Camp/events-and-camp-14.jpeg", title: "Camp", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { src: "/Images/Family tent/Main.jpeg", title: "Family Tent", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" }
];

export default function MigratePage() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const startMigration = async () => {
    setIsMigrating(true);
    setStatus('Initializing Firebase...');
    
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');

      for (let i = 0; i < imagesToMigrate.length; i++) {
        const img = imagesToMigrate[i];
        setStatus(`Uploading ${i + 1} of ${imagesToMigrate.length}...`);
        
        // 1. Fetch the local file as a Blob
        const response = await fetch(img.src);
        if (!response.ok) {
          console.warn(`Skipping ${img.src} - not found locally.`);
          continue;
        }
        const blob = await response.blob();
        const file = new File([blob], 'image.jpeg', { type: blob.type });

        // 2. Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'woodside_events');

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/bali5bin/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.secure_url) {
          // 3. Save to Firestore
          await addDoc(collection(db, 'gallery'), {
            src: uploadData.secure_url,
            title: img.title || 'Gallery Image',
            colSpan: img.colSpan || 'col-span-1',
            rowSpan: img.rowSpan || 'row-span-1',
            createdAt: serverTimestamp()
          });
        } else {
          console.error(`Failed to upload ${img.src}`, uploadData);
        }

        setProgress(Math.round(((i + 1) / imagesToMigrate.length) * 100));
      }

      setStatus('Migration Complete! You can now safely remove the default images from Gallery.tsx');
    } catch (error: any) {
      console.error('Migration failed:', error);
      setStatus(`Error: ${error.message}`);
    }
    
    setIsMigrating(false);
  };

  return (
    <div className="min-h-screen bg-woodside-950 flex flex-col items-center justify-center text-white p-8">
      <div className="max-w-xl w-full bg-woodside-900/50 p-8 rounded-2xl border border-white/10 text-center">
        <h1 className="text-3xl font-serif mb-4">Gallery Migration Tool</h1>
        <p className="text-white/70 mb-8 text-sm">
          This tool will safely transfer your {imagesToMigrate.length} local images to Cloudinary and Firebase so they can be managed from the Admin Panel.
        </p>

        {progress > 0 && (
          <div className="w-full bg-woodside-950 rounded-full h-4 mb-4 overflow-hidden border border-white/10">
            <div 
              className="bg-green-500 h-4 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="text-sm text-woodside-200 mb-8 min-h-6">
          {status}
        </div>

        <button 
          onClick={startMigration}
          disabled={isMigrating || progress === 100}
          className="bg-white text-woodside-950 font-bold px-8 py-3 rounded-xl hover:bg-woodside-100 disabled:opacity-50 transition-colors flex items-center justify-center w-full"
        >
          {isMigrating ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Migrating...</>
          ) : progress === 100 ? (
            'Migration Finished'
          ) : (
            'Start Migration Now'
          )}
        </button>
      </div>
    </div>
  );
}
