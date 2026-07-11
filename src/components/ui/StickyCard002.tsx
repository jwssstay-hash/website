"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface StickyCard002Props {
  cards: React.ReactNode[];
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
}

export const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  cardClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        // Push off-screen exactly by window height to ensure it is completely hidden at the bottom of the screen
        gsap.set(cardElements[i], { y: window.innerHeight, scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.95,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative w-full", className)} ref={container}>
      <div className="sticky-cards relative flex w-full items-center justify-center overflow-hidden p-4 lg:p-8 min-h-screen">
        <div
          className={cn(
            "relative h-[80vh] w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={cn(
                "absolute h-full w-full top-0 left-0",
                cardClassName,
              )}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
