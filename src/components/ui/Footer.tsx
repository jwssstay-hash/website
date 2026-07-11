import React from 'react';
import { Logo } from '../ui/Logo';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#030811] text-woodside-50 pt-24 pb-8 border-t border-woodside-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <Logo variant="light" className="mb-6 items-start -ml-2" />
            <p className="text-sm font-light leading-relaxed mb-6 text-woodside-50/80">
              Experience peaceful stays surrounded by the untouched beauty of Jawadhu Hills. A premium eco-retreat.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/jwss.co.in/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-woodside-300/30 flex items-center justify-center hover:bg-woodside-800 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/p/Jawadhu-Woodside-Serene-Farm-Stay-61567622935455/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-woodside-300/30 flex items-center justify-center hover:bg-woodside-800 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/jawadhu-hills-woodside-serene-astro-camp-and-farm-stay-428a21276?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-woodside-300/30 flex items-center justify-center hover:bg-woodside-800 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-light text-woodside-50/80">
              <li><a href="/" className="hover:text-woodside-300 transition-colors">Home</a></li>
              <li><a href="/gallery" className="hover:text-woodside-300 transition-colors">Gallery</a></li>
              <li><a href="/events" className="hover:text-woodside-300 transition-colors">Events</a></li>
              <li><a href="/booking" className="hover:text-woodside-300 transition-colors">Book Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-light text-woodside-50/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-woodside-300 shrink-0 mt-0.5" />
                <span>Kavalur Rd, Alangayam R.F.,<br/>Bheemakulam, Tamil Nadu 635701</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-woodside-300 shrink-0" />
                <a href="tel:+919840741075" className="hover:text-woodside-300 transition-colors">098407 41075</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-woodside-300 shrink-0" />
                <span>contact@jwss.co.in</span>
              </li>
            </ul>
          </div>


        </div>

        <div className="pt-8 border-t border-woodside-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-woodside-50/50 font-light">
            &copy; {new Date().getFullYear()} Woodside Serene. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-woodside-50/50 font-light">
            <a href="#" className="hover:text-woodside-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-woodside-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
