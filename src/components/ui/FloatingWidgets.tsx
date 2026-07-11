import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWidgets() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
