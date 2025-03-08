"use client";
import React from "react";
import { motion } from "framer-motion";

export const SvgMaskEffect = () => {
  return (
    <div className="relative w-full h-40 overflow-hidden">
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <defs>
          <mask id="mask" x="0" y="0" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
            <motion.text
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
              className="text-6xl font-bold"
              fill="black" 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle"
            >
              AAYUSH KUMAR
            </motion.text>
          </mask>
        </defs>

        <motion.rect
          width="100%"
          height="100%"
          fill="url(#gradient)"
          mask="url(#mask)"
        />

        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="50%" stopColor="#1E90FF" />
            <stop offset="100%" stopColor="#FF69B4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default SvgMaskEffect;