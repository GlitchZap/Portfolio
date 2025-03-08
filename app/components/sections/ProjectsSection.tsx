"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Define project data type
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured?: boolean;
  type?: 'web' | 'mobile' | 'ai';
}

// Project data
const projectData: Project[] = [
  {
    title: "VibeOut",
    description: "A social platform for discovering music events and connecting with fellow enthusiasts. Built with Next.js, MongoDB, and integrated with Spotify API.",
    image: "/vibeout.png",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Spotify API"],
    github: "https://github.com/GlitchZap/vibeout",
    demo: "https://vibeout-demo.vercel.app",
    featured: true,
    type: 'web'
  },
  {
    title: "OnboardX",
    description: "Interactive onboarding solution for product teams to create guided user experiences. Features drag-and-drop editor and analytics dashboard.",
    image: "/onboardx.png",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/GlitchZap/onboardx",
    demo: "https://onboardx-app.herokuapp.com",
    type: 'web'
  },
  {
    title: "DeepFake Detector",
    description: "AI-powered tool that detects manipulated media with high accuracy. Utilizes deep learning models and computer vision techniques.",
    image: "/deepfake.png",
    tags: ["Python", "TensorFlow", "Flask", "React"],
    github: "https://github.com/GlitchZap/deepfake-detector",
    demo: "https://deepfake-detect.ai",
    featured: true,
    type: 'ai'
  },
  {
    title: "CodeSync",
    description: "Real-time collaborative code editor with syntax highlighting, video chat, and version control integration.",
    image: "/codesync.png",
    tags: ["Socket.io", "Express", "MongoDB", "WebRTC"],
    github: "https://github.com/GlitchZap/codesync",
    demo: "https://codesync-collab.vercel.app",
    type: 'web'
  }
];

// Accentricity UI card with optimized hover effect
const ProjectCard = ({ project, index, style }: { project: Project; index: number; style?: React.CSSProperties }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
  // Track mouse position for instant hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset position on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Dynamic mask for hover effect
  const maskImage = useMotionTemplate`radial-gradient(120px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.85) 70%)`;
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-gradient-to-br from-purple-900/20 via-black/70 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className={`relative ${project.featured ? 'h-60' : 'h-48'} overflow-hidden`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 hover:scale-110"
          priority={index < 2}
        />
        
        {/* Mask overlay for hover effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80"
          style={{ maskImage }}
        />
        
        {/* Type badge */}
        {project.type && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-md bg-black/40 backdrop-blur-sm border border-white/10">
            {project.type === 'web' && 'Web App'}
            {project.type === 'mobile' && 'Mobile App'}
            {project.type === 'ai' && 'AI Project'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded-md text-xs text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
          <a href={project.github} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <FaGithub className="group-hover:text-purple-400" /> 
            <span>GitHub</span>
            <span className="w-0 h-px bg-purple-500 group-hover:w-full transition-all duration-300"/>
          </a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <FaExternalLinkAlt className="group-hover:text-blue-400" /> 
            <span>Live Demo</span>
            <span className="w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300"/>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"] 
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      {/* Dynamic background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-purple-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-900/10 to-transparent" />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            My <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            A showcase of my recent work, featuring web applications and design projects.
            Each project represents different challenges and technologies I have worked with.
          </p>
        </motion.div>

        {/* Bento grid layout for more appealing and even presentation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Featured project - spans 7 columns */}
          <ProjectCard 
            project={projectData[0]} 
            index={0} 
            style={{ gridColumn: "span 7", height: '550px' }} 
          />
          
          {/* Second project - spans 5 columns */}
          <ProjectCard 
            project={projectData[1]} 
            index={1} 
            style={{ gridColumn: "span 5", height: '550px' }} 
          />
          
          {/* Third project - spans 5 columns */}
          <ProjectCard 
            project={projectData[2]} 
            index={2} 
            style={{ gridColumn: "span 5", height: '500px' }} 
          />
          
          {/* Fourth project - spans 7 columns */}
          <ProjectCard 
            project={projectData[3]} 
            index={3} 
            style={{ gridColumn: "span 7", height: '500px' }} 
          />
        </div>
        
        {/* View all projects button */}
        <div className="flex justify-center mt-12">
          <motion.a
            href="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-70"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}