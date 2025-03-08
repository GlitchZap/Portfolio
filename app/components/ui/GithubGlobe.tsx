"use client";
import React, {  } from 'react';
import { motion } from 'framer-motion';

// Simple placeholder component using an image instead of 3D
const GithubGlobe = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-[400px] md:h-[600px] relative flex items-center justify-center"
    >
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: [0.9, 1.05, 0.9],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          {/* Globe image with animation */}
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 border border-white/10">
            {/* You can replace this with an actual globe image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Grid lines for globe effect */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ellipse 
                      key={`horizontal-${i}`}
                      cx="50" 
                      cy="50" 
                      rx="45" 
                      ry={10 + i * 5}
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.5"
                    />
                  ))}
                  
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line 
                      key={`vertical-${i}`}
                      x1="50" 
                      y1="5" 
                      x2="50" 
                      y2="95"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                      transform={`rotate(${i * 30}, 50, 50)`}
                    />
                  ))}
                </svg>
              </div>
            </div>
            
            {/* Add random points to simulate activity */}
            {Array.from({ length: 40 }).map((_, i) => {
              // Random position within the circle
              const angle = Math.random() * Math.PI * 2;
              const distance = Math.random() * 0.8; // Keep within 80% of radius
              const x = 50 + Math.cos(angle) * distance * 45;
              const y = 50 + Math.sin(angle) * distance * 45;
              
              // Random size and color
              const size = Math.random() * 4 + 1;
              const colors = ['#8A2BE2', '#1E90FF', '#FF69B4'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <motion.div 
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 5,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
        
        {/* GitHub logo in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="bg-black/30 backdrop-blur-sm p-4 rounded-full"
          >
            <svg fill="white" width="48" height="48" viewBox="0 0 16 16" className="opacity-70">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </motion.div>
        </div>
      </div>
      
      {/* Floating commit messages */}
      {[
        "Initial commit", 
        "Fix bug #42", 
        "Add new feature", 
        "Update README.md",
        "Merge pull request"
      ].map((text, i) => (
        <motion.div
          key={i}
          className="absolute text-xs md:text-sm bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/70 border border-white/10"
          initial={{ opacity: 0, y: 0, x: (i % 2 === 0 ? -100 : 100) }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [(i % 2 === 0 ? -50 : 50), 0, (i % 2 === 0 ? 50 : -50)],
            x: [(i % 2 === 0 ? -100 : 100), 0, (i % 2 === 0 ? 100 : -100)]
          }}
          transition={{
            duration: 8,
            delay: i * 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{
            top: `${30 + i * 10}%`,
            left: `${i % 2 === 0 ? 30 : 60}%`,
          }}
        >
          {text}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GithubGlobe;