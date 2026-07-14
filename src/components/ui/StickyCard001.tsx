"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface StickyCard001Props {
  cards: React.ReactNode[];
  className?: string;
}

const StickyCardItem = ({
  i,
  progress,
  range,
  targetScale,
  children,
}: {
  i: number;
  progress: any;
  range: [number, number];
  targetScale: number;
  children: React.ReactNode;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center w-full h-screen pointer-events-none"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 20}px)`,
        }}
        className="relative origin-top flex flex-col w-full max-w-[95%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl h-[70vh] md:h-[80vh] pointer-events-auto shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StickyCard001 = ({ cards, className }: StickyCard001Props) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main
      ref={container}
      className={cn(
        "relative flex w-full flex-col items-center justify-center pb-[25vh]",
        className
      )}
    >
      {cards.map((card, i) => {
        const targetScale = Math.max(0.5, 1 - (cards.length - i - 1) * 0.1);
        return (
          <StickyCardItem
            key={`card_${i}`}
            i={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          >
            {card}
          </StickyCardItem>
        );
      })}
    </main>
  );
};
