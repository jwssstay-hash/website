import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'light' }: LogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-woodside-950';
  const accentColor = isLight ? 'text-woodside-200' : 'text-woodside-600';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <span className={`font-serif font-bold tracking-[0.25em] uppercase text-xl md:text-2xl leading-none ${textColor}`}>
          Woodside
        </span>
        <div className="flex items-center gap-2 mt-2 w-full px-1">
          <div className={`h-[1px] flex-1 ${isLight ? 'bg-woodside-200/50' : 'bg-woodside-600/50'}`} />
          <span className={`font-sans tracking-[0.4em] uppercase text-[0.6rem] md:text-[0.7rem] leading-none ${accentColor}`}>
            Serene
          </span>
          <div className={`h-[1px] flex-1 ${isLight ? 'bg-woodside-200/50' : 'bg-woodside-600/50'}`} />
        </div>
      </div>
    </div>
  );
}
