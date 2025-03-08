"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className = "",
}: TextRevealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        {children}

        <motion.div
          className="h-40 mt-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute w-full h-full text-white font-bold text-xl md:text-3xl lg:text-4xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.div>

          <motion.div
            className="absolute w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-xl md:text-3xl lg:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {revealText}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TextRevealCard;