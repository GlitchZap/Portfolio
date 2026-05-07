"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for direct DOM updates (bypasses React state to avoid lag)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Inner dot springs (faster, more direct)
  const dotSpringConfig = { damping: 20, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Only run on client-side and ignore on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHover = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Function to attach hover listeners to interactive elements
    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      interactiveElements.forEach(el => {
        // Remove first to avoid duplicates if re-attaching
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
        
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
      return interactiveElements;
    };

    let elements = attachListeners();

    // Handle dynamic DOM changes (e.g., when navigating or opening modals)
    const observer = new MutationObserver(() => {
      elements = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div 
      className="hidden md:block pointer-events-none fixed inset-0 z-[9999]" 
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {/* Outer Circle (Trailing Effect) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-purple-500/50 bg-purple-500/10 backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
          width: 32,
          height: 32,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Inner Dot (Snappy) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
}