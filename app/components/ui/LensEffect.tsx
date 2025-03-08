"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface LensEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const LensEffect: React.FC<LensEffectProps> = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Lens effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            left: position.x - 150,
            top: position.y - 150,
            zIndex: 10,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: [0, 1],
          }}
          transition={{
            type: "spring",
            damping: 20,
          }}
        />
      )}
    </motion.div>
  );
};

export default LensEffect;