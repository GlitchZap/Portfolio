"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const LensMagnifier = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate position relative to the container
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      // Update position state
      setPosition({ x, y });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full cursor-none overflow-hidden"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Original content */}
      {children}
      
      {/* Magnifier lens */}
      {showMagnifier && (
        <motion.div 
          className="pointer-events-none absolute h-24 w-24 rounded-full border border-white/20 bg-transparent overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: `calc(${position.x}% - 3rem)`, 
            y: `calc(${position.y}% - 3rem)`
          }}
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            backdropFilter: "brightness(1.2) contrast(1.2)",
          }}
        >
          {/* Magnified content */}
          <div 
            className="h-[400%] w-[400%] relative"
            style={{ 
              transform: `translate(calc(-${position.x}% / 1.33), calc(-${position.y}% / 1.33)) scale(1.5)`,
            }}
          >
            {/* Clone the children with an increased scale */}
            <div className="scale-150 transform-origin-center absolute inset-0">
              {React.cloneElement(children as React.ReactElement)}
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border border-purple-500/30 pointer-events-none" />
        </motion.div>
      )}
    </div>
  );
};