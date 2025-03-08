"use client";
import React from "react";
import { motion } from "framer-motion";

export const BoxesCore = () => {
  const rows = 5;
  const cols = 5;

  const gridItems = [];
  for (let i = 0; i < rows * cols; i++) {
    gridItems.push(i);
  }

  return (
    <div
      style={{
        transform: `translate(-40%, -60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className="absolute left-1/2 top-1/2 flex w-full flex-row-reverse flex-wrap"
    >
      {gridItems.map((index) => (
        <motion.div
          key={index}
          className="h-28 w-28 bg-purple-500/[0.3] border border-white/[0.3] rounded-xl"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0.5],
            scale: 1,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export const BackgroundBoxes = () => {
  return (
    <div className="relative h-[50rem] w-full overflow-hidden -z-10">
      <div className="absolute inset-0 w-full h-full bg-black">
        <BoxesCore />
      </div>
    </div>
  );
};