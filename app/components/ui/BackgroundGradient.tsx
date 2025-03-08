"use client";
import React from "react";
import { motion } from "framer-motion";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(-45deg, #8A2BE2, #1E90FF, #FF69B4, #8A2BE2)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        
      >
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
      
      {children}
    </div>
  );
};

export default BackgroundGradient;