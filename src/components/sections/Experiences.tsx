import React from 'react';
import { Camera, Sunrise, Flame, Bike } from 'lucide-react';

const experiences = [
  { icon: <Sunrise size={32} />, title: "Sunrise Trek", desc: "Guided early morning treks to witness breathtaking sunrise views over the hills." },
  { icon: <Flame size={32} />, title: "Campfire Nights", desc: "Cozy evenings around the campfire with music, stories, and stargazing." },
  { icon: <Bike size={32} />, title: "Cycling Trails", desc: "Explore the scenic paths and local villages on our complimentary bicycles." },
  { icon: <Camera size={32} />, title: "Bird Watching", desc: "Discover rare bird species hidden within the rich biodiversity of Jawadhu." },
];

export function Experiences() {
  return (
    <section id="experiences" className="py-24 bg-woodside-950 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
          Immersive Experiences
        </h2>
        <p className="text-woodside-50 font-sans tracking-widest uppercase text-sm mb-16">
          More than just a stay
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-woodside-900/50 border border-woodside-600/20 hover:bg-woodside-900 transition-all duration-300 shadow-lg group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-woodside-800 rounded-full flex items-center justify-center text-woodside-50 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                {exp.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-3">{exp.title}</h3>
              <p className="text-woodside-50/80 text-sm leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
