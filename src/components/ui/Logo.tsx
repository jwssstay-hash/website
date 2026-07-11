import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'light' }: LogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-woodside-950';
  const leafColor = isLight ? 'text-woodside-50' : 'text-woodside-600';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg width="64" height="48" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-8 md:w-12 md:h-10">
        <circle cx="50" cy="40" r="30" className={isLight ? 'fill-white/10' : 'fill-woodside-900/10'} />
        <path d="M50 20C50 20 65 30 70 45C70 45 60 35 50 35C40 35 30 45 30 45C35 30 50 20 50 20Z" className={`fill-current ${leafColor}`} />
        <path d="M50 35V65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={leafColor} />
      </svg>
      <div className="flex flex-col items-center mt-1">
        <span className={`font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm leading-none ${textColor}`}>
          Woodside
        </span>
        <span className={`font-serif italic text-xs md:text-sm leading-none mt-1 ${leafColor}`}>
          Serene
        </span>
      </div>
    </div>
  );
}
