'use client';

import React from 'react';

export function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-woodside-950 pointer-events-none">
      <img
        src="/Images/General Farm Photos/general-farm-photos-34.jpeg"
        alt="Woodside Serene Farm Background"
        className="absolute w-full h-full object-cover opacity-40"
      />
      {/* Gradient overlays to blend it perfectly with the dark theme */}
      <div className="absolute inset-0 bg-woodside-950/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-woodside-950 via-transparent to-woodside-950" />
    </div>
  );
}
