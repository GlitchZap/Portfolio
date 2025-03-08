"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface CardCarouselProps {
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const AppleCardCarousel: React.FC<CardCarouselProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          className="flex gap-6 px-12"
          style={{
            x: useTransform(scrollYProgress, [0, 0.5], [100, -100 * items.length]),
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="w-[300px] md:w-[400px] h-[500px] relative flex-shrink-0 rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
                perspective: "1000px",
              }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AppleCardCarousel;