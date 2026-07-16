import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'light' }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center w-24 md:w-32 ${className}`}>
      <img 
        src="/logo.png" 
        alt="Woodside Serene" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 md:mt-4 -ml-2 md:-ml-4 w-[120px] md:w-[160px] max-w-none object-contain drop-shadow-md pointer-events-none"
      />
    </div>
  );
}
