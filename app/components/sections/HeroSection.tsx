"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

// Fixed Accentricity UI components with proper TypeScript typing
interface GlowingButtonProps extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  children: React.ReactNode;
  onClick?: () => void;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <motion.button
      className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white rounded-full group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-400 rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-purple-600"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

// TypeWriter effect component
interface TypewriterEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ texts, typingSpeed = 100, deletingSpeed = 50, delayBetweenTexts = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (!texts.length) return;
    
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      const currentText = texts[currentIndex];
      
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setCurrentIndex((currentIndex + 1) % texts.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, delayBetweenTexts, displayText, isTyping, texts, typingSpeed, deletingSpeed]);
  
  return <span className="inline-block">{displayText}<span className="text-purple-400 animate-pulse">|</span></span>;
};

// Animated background with particles
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to fill the entire screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
    }[] = [];
    
    // Increase particle count for better screen coverage
    const particleCount = Math.min(Math.floor(window.innerWidth / 8), 150);
    
    const colors = [
      'rgba(147, 51, 234, 0.7)',  // purple
      'rgba(59, 130, 246, 0.7)',   // blue
      'rgba(99, 102, 241, 0.7)',   // indigo
    ];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
    
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse movement
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Basic movement
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Mouse influence (subtle attraction)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          p.x += dx * 0.01;
          p.y += dy * 0.01;
        }
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - distance/500})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      rafId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

export default function HomeSection() {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const typingTexts = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Application Expert",
    "Tech Enthusiast"
  ];
  
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } });
  }, [controls]);

  return (
    <section id="home" className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic background - now with full screen width and height */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-purple-950/10 to-black z-0">
        <ParticleBackground />
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="container relative mx-auto px-4 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <motion.span 
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                Aayush Kumar
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-medium mb-8 text-gray-300 min-h-[2.25rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <TypewriterEffect texts={typingTexts} />
          </motion.h2>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg text-gray-400 mb-10">
              I build engaging web experiences with modern technologies 
              and a focus on performance and user experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              { href: "https://github.com/GlitchZap", icon: <FaGithub className="w-8 h-8" />, label: "GitHub" },
              { href: "https://x.com/AayushKumar666", icon: <FaTwitter className="w-8 h-8" />, label: "Twitter" },
              { href: "https://www.linkedin.com/in/aayush-kumar-30019728a/", icon: <FaLinkedin className="w-8 h-8" />, label: "LinkedIn" }
            ].map((social) => (
              <motion.a 
                key={social.href}
                href={social.href} 
                target="_blank" 
                rel="noreferrer" 
                aria-label={social.label}
                className="relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white group-hover:text-blue-400 transition-colors">
                  {social.icon}
                </span>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <GlowingButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </GlowingButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}