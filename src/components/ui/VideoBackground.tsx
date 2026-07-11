'use client';

import React, { useState, useEffect, useRef } from 'react';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(1); // Default to 1 so it's not permanently invisible on mobile

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const checkTime = () => {
      if (!video.duration) {
        animationFrameId = requestAnimationFrame(checkTime);
        return;
      }

      const timeRemaining = video.duration - video.currentTime;

      // Fade in over 0.5s at the start
      if (video.currentTime <= 0.5 && !video.paused) {
        setOpacity(video.currentTime / 0.5);
      } 
      // Fade out over 0.5s before the end
      else if (timeRemaining <= 0.5) {
        setOpacity(Math.max(0, timeRemaining / 0.5));
      } 
      // Fully visible in between
      else {
        setOpacity(1);
      }

      animationFrameId = requestAnimationFrame(checkTime);
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(checkTime);
    };

    const handleEnded = () => {
      setOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(console.error);
        }
      }, 100);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);
    
    // Auto play on mount
    video.play().catch(e => console.log("Autoplay prevented:", e));

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-woodside-950 pointer-events-none">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute w-full h-full object-cover"
        style={{ opacity, transition: 'opacity 0.1s linear' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
      />
      {/* Gradient overlays to blend it perfectly with the dark theme */}
      <div className="absolute inset-0 bg-woodside-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-woodside-950 via-transparent to-woodside-950" />
    </div>
  );
}
