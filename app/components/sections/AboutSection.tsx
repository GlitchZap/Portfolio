"use client";

import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

// Accentricity UI skill badge component
const SkillBadge = ({ skill }: { skill: string }) => {
  return (
    <motion.div
      className="px-3 py-1.5 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/40 rounded-full 
                text-sm text-gray-200 relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{skill}</span>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 -z-0"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default function AboutSection() {
  // Skills data
  const skills = [
    "React", "Next.js", "TypeScript", 
    "Node.js", "Express", "MongoDB", 
    "TailwindCSS", "GraphQL", "AWS", 
    "Framer Motion", "UI/UX Design", "RESTful APIs"
  ];

  // Animation controls
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Enhanced Background with full width and subtle movement */}
      <div className="absolute inset-0 w-full -z-10">
        {/* Animated gradient blobs - positioned for full width */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-purple-600/10 rounded-full filter blur-[120px] animate-blob" />
        <div className="absolute top-[30%] -right-[10%] w-[60%] h-[70%] bg-blue-600/10 rounded-full filter blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full filter blur-[120px] animate-blob animation-delay-4000" />
        
        {/* Geometric patterns - full width */}
        <div className="absolute inset-0 w-screen bg-[linear-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] bg-[size:35px_35px]"></div>
        
        {/* Large circular rings - centered but expanded */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] border border-white/5 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] border border-white/5 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] border border-white/5 rounded-full opacity-40"></div>
        
        {/* Floating particles - spread across entire width */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            initial={{ 
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 1 + 0.5,
            }}
            animate={{ 
              x: [
                Math.random() * 120 - 60 + '%',
                Math.random() * 120 - 60 + '%',
                Math.random() * 120 - 60 + '%',
              ],
              y: [
                Math.random() * 120 - 60 + '%',
                Math.random() * 120 - 60 + '%',
                Math.random() * 120 - 60 + '%',
              ],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 20 + 20,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
        
        {/* Noise texture overlay - full width */}
        <div className="absolute inset-0 w-screen h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Title - Centered with more space */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            About <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Me</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Passionate full stack developer with expertise in creating responsive and 
            interactive web applications. I focus on delivering quality user experiences and solving complex challenges.
          </p>
        </motion.div>

        {/* Centered Content with more spacing */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            {/* Profile Image - enhanced size and presence */}
            <motion.div 
              className="mb-16"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.div 
                  className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-purple-500/50"
                  initial={{ rotate: -5, scale: 0.95 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Aayush Patel"
                    fill
                    className="object-cover"
                  />
                  
                  {/* Reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/20" />
                </motion.div>
                
                {/* Decorative ring - larger */}
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-purple-500/20 animate-spin-slow" />
                <div className="absolute -inset-8 rounded-full border border-purple-500/10 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              </div>
            </motion.div>

            {/* Bio Content - more spacious */}
            <motion.div variants={containerVariants} className="text-center">
              <motion.h3 
                className="text-2xl font-semibold mb-10 text-purple-400"
                variants={itemVariants}
              >
                Skills & Technologies
              </motion.h3>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-16"
                variants={containerVariants}
              >
                {skills.map((skill, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <SkillBadge skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-16 px-6">
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  I am a full-stack developer with over 5 years of experience building modern web applications. 
                  My expertise spans across front-end development with React and Next.js, back-end solutions 
                  with Node.js, and database management with MongoDB and PostgreSQL.
                </p>
                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                  I am passionate about creating clean, efficient code and designing intuitive user interfaces.
                  When I am not coding, you can find me exploring new technologies, contributing to open-source
                  projects, or sharing knowledge through technical writing.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <a
                  href="/resume.pdf"
                  download
                  className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Download Resume</span>
                  <span className="relative invisible">Download Resume</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}