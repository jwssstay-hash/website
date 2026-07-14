'use client';

import React, { useEffect, useState } from 'react';

const fallbackReviews = [
  { name: "Rahul S.", rating: 5, text: "The Glass House is surreal! Best weekend getaway we've had in years. The views at sunrise are incredible." },
  { name: "Priya M.", rating: 5, text: "Incredibly peaceful. The staff is so welcoming and the food is just amazing authentic South Indian." },
  { name: "Arun K.", rating: 4, text: "Loved the family tent experience. Kids had a great time around the campfire and the morning trek." }
];

export function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { db } = await import('@/lib/firebase');
        const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => doc.data());
        setReviews(fetched.length > 0 ? fetched : fallbackReviews);
      } catch (error) {
        console.error("Error fetching testimonials", error);
        setReviews(fallbackReviews);
      }
      setIsLoading(false);
    };

    fetchStories();
  }, []);

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
          {isLoading ? (
             <div className="col-span-1 md:col-span-3 text-woodside-400 p-12 text-center animate-pulse">Loading stories...</div>
          ) : (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="p-8 bg-woodside-800/50 rounded-2xl border border-woodside-600/30 text-left"
              >
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-woodside-50 font-light italic mb-6">"{review.text}"</p>
                <p className="text-white font-serif">- {review.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
