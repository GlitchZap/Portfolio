"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaCode, FaEnvelope } from 'react-icons/fa';

export default function FloatingDock() {
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Nav items configuration is defined inside the component
  const navItems = [
    { icon: <FaHome size={20} />, label: 'Home', href: '#home' },
    { icon: <FaUser size={20} />, label: 'About', href: '#about' },
    { icon: <FaBriefcase size={20} />, label: 'Projects', href: '#projects' },
    { icon: <FaCode size={20} />, label: 'Skills', href: '#skills' },
    { icon: <FaEnvelope size={20} />, label: 'Contact', href: '#contact' },
  ];

  // Handle scroll events to show/hide the dock and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Hide dock when scrolling down, show when scrolling up
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 20) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 20) {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial active section check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Floating bubble with hover effect */}
          <motion.div 
            className="flex flex-col items-center bg-black/60 backdrop-blur-md rounded-full p-3 border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            whileHover={{ boxShadow: '0 0 25px rgba(139,92,246,0.5)' }}
          >
            {navItems.map((item, index) => (
              <NavItem 
                key={index}
                item={item} 
                isActive={activeSection === item.href.substring(1)}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Define proper interface for NavItemProps
interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
}

const NavItem = ({ item, isActive }: NavItemProps) => {
  return (
    <motion.a
      href={item.href}
      className={`relative flex items-center justify-center w-10 h-10 my-1 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-white/10'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{item.icon}</span>
      
      {/* Label tooltip */}
      <motion.div 
        className={`absolute left-12 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200
          border border-white/10 shadow-[0_0_10px_rgba(139,92,246,0.2)]
        `}
        initial={{ opacity: 0, x: -10 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : -10,
          pointerEvents: isActive ? 'auto' : 'none'
        }}
      >
        {item.label}
        {/* Arrow */}
        <div className="absolute top-1/2 -left-1 w-2 h-2 bg-black/80 border-l border-t border-white/10 -translate-y-1/2 rotate-45"></div>
      </motion.div>
    </motion.a>
  );
};