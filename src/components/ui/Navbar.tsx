'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { Logo } from './Logo';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/events', label: 'Events' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-[80] flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-white drop-shadow-md">
          <Logo variant="light" className="h-8" />
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
          {navLinks.map((link, i) => (
             <a
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-2 transition-colors ${
                i === 0 ? 'font-semibold text-woodside-950' : 'font-medium text-woodside-600 hover:text-woodside-950'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="/booking" className="ml-2 bg-woodside-950 hover:bg-woodside-900 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors flex items-center gap-2 shadow-md">
            Book Now
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-white drop-shadow-md">
          <a href="tel:+919840741075" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            <Phone className="w-4 h-4" />
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-white text-woodside-950 shadow-sm z-[100] cursor-pointer active:scale-95 transition-transform"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-woodside-950/40 backdrop-blur-sm" />
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-woodside-950 py-4 border-b border-woodside-950/10 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
             <a href="tel:+919840741075" className="flex items-center gap-2 text-sm font-medium text-woodside-800 sm:hidden">
              <Phone className="w-4 h-4" />
              Contact
            </a>
            <a href="/booking" onClick={() => setMenuOpen(false)} className="mt-2 bg-woodside-950 hover:bg-woodside-900 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors flex items-center justify-center gap-2">
              <CalendarCheck className="w-4 h-4" /> Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
