import React from 'react';

const reviews = [
  { name: "Rahul S.", rating: 5, text: "The Glass House is surreal! Best weekend getaway we've had in years. The views at sunrise are incredible." },
  { name: "Priya M.", rating: 5, text: "Incredibly peaceful. The staff is so welcoming and the food is just amazing authentic South Indian." },
  { name: "Arun K.", rating: 4, text: "Loved the family tent experience. Kids had a great time around the campfire and the morning trek." }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-woodside-950 relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
          Guest Stories
        </h2>
        <p className="text-woodside-50 font-sans tracking-widest uppercase text-sm mb-16">
          What our visitors say
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 bg-woodside-800/50 rounded-2xl border border-woodside-600/30 text-left"
            >
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-woodside-50 font-light italic mb-6">"{review.text}"</p>
              <p className="text-white font-serif">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
