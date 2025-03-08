"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const FollowingPointer: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // For tablet and mobile, we don't show the following pointer
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-60 pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{
        type: "spring",
        mass: 0.1,
        stiffness: 100,
        damping: 20,
      }}
    />
  );
};

export default FollowingPointer;