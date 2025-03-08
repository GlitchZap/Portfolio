"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Image {
  src: string;
  alt: string;
}

interface HeroParallaxProps {
  images?: Image[];
  children?: React.ReactNode;
}

const ParallaxImage = ({ src, alt, index }: Image & { index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Use transform values based on index to create staggered effect
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? -100 : -200]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    [1, 0.8, 0]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        translateY,
        opacity
      }}
      className={`absolute w-40 h-60 rounded-xl overflow-hidden
        ${index % 3 === 0 ? "top-[10%]" : index % 3 === 1 ? "top-[30%]" : "top-[50%]"}
        ${index % 2 === 0 ? "right-[5%]" : "left-[5%]"}
        ${index === 0 ? "left-[20%]" : index === 1 ? "right-[20%]" : ""}
      `}
    >
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
    </motion.div>
  );
};

export default function HeroParallax({ images = [], children }: HeroParallaxProps) {
  return (
    <div className="relative w-full overflow-hidden bg-black h-screen">
      {/* Background Opacity Layer */}
      <div className="absolute inset-0 z-0 bg-black/40" />
      
      {/* Content */}
      <div className="flex flex-col items-center justify-center relative z-10 h-full">
        {children}
      </div>
      
      {/* Parallax Images */}
      {images.map((image, index) => (
        <ParallaxImage key={index} {...image} index={index} />
      ))}
    </div>
  );
}