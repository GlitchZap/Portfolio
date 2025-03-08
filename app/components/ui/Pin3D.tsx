"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface Pin3DProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
}

const Pin3D = ({ title, content, icon, className }: Pin3DProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-6 border border-white/10 shadow-xl ${className}`}
    >
      <div style={{ transform: "translateZ(75px)" }} className="relative z-10">
        <div className="flex items-center justify-between">
          {icon && <div className="text-4xl text-white/80 mb-4">{icon}</div>}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        </div>
        <p className="text-neutral-300 text-sm">{content}</p>
      </div>
      
      {/* Shadow and glow effects */}
      <div
        style={{
          transform: "translateZ(50px)",
          backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
        className="absolute inset-0 rounded-xl opacity-60"
      />
    </motion.div>
  );
};

export default Pin3D;