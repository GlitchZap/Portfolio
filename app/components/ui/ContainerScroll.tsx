"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContainerScrollProps {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleDimensions = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[300vh] ${className}`}
    >
      <motion.div
        style={{
          scale: scaleDimensions,
          opacity,
          position: "sticky",
          top: 0,
        }}
        className="flex min-h-screen items-center justify-center"
      >
        <motion.div
          className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-24"
        >
          {titleComponent}
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContainerScroll;