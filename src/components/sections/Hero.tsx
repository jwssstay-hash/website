'use client';

import React from 'react';
import BoomerangVideoBg from '../ui/BoomerangVideoBg';

const BG_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';
const HERO_TITLE = 'Welcome to Woodside Serene';

function AnimatedWelcomeText() {
  const characters = HERO_TITLE.split('');
  const centerIndex = Math.floor(characters.length / 2);
  const words = HERO_TITLE.split(' ');
  let globalIndex = 0;

  return (
    <span className="welcome-title" aria-label={HERO_TITLE}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const wordNode = (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const index = globalIndex++;
              const distanceFromCenter = index - centerIndex;
              return (
                <span
                  key={`${char}-${index}`}
                  aria-hidden="true"
                  className="welcome-char"
                  style={
                    {
                      '--start-x': `${distanceFromCenter * 42}px`,
                      '--start-rotate': `${distanceFromCenter * 3.5}deg`,
                      '--start-delay': `${Math.abs(distanceFromCenter) * 14}ms`,
                    } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        
        // Advance the globalIndex to account for the space character in the math
        if (wordIndex < words.length - 1) {
          globalIndex++;
        }
        
        return (
          <React.Fragment key={`frag-${wordIndex}`}>
            {wordNode}
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden">
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full" />
      
      {/* Hero copy */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 pb-[30vh] sm:pb-[25vh] md:pb-[30vh]">
        <h1
          className="font-bold leading-[1.1] md:leading-[0.95] text-woodside-900 text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl font-serif tracking-[-0.02em]"
        >
          <AnimatedWelcomeText />
        </h1>
        <p className="mt-8 sm:mt-8 text-woodside-300 text-lg sm:text-lg md:text-xl leading-relaxed max-w-lg px-2 drop-shadow-sm font-light mb-10">
          Experience luxury camping and peaceful stays amidst the serene Jawadhu Hills.
        </p>
        <a 
          href="/booking"
          className="bg-woodside-950 hover:bg-woodside-900 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2 group"
        >
          Book Now
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

    </section>
  );
}
