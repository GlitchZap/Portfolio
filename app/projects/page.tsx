"use client";

import React, { useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaFilter } from 'react-icons/fa';

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

// Extended project data for all projects page
const allProjects: Project[] = [
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
  },
  {
    title: "FitTrack",
    description: "A fitness tracking mobile app that helps users monitor workouts, nutrition, and progress with personalized insights.",
    image: "/fittrack.png",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    github: "https://github.com/GlitchZap/fittrack",
    demo: "https://fittrack-app.demo",
    type: 'mobile'
  },
  {
    title: "SmartBudget",
    description: "Personal finance application with expense tracking, budget planning, and visualization tools to help users manage their finances.",
    image: "/smartbudget.png",
    tags: ["Vue.js", "Firebase", "Chart.js", "PWA"],
    github: "https://github.com/GlitchZap/smartbudget",
    demo: "https://smart-budget.app",
    type: 'web'
  },
  {
    title: "NLP Summarizer",
    description: "AI-powered text summarization tool that uses natural language processing to create concise summaries of long articles and documents.",
    image: "/nlp-summarizer.png",
    tags: ["Python", "NLTK", "FastAPI", "React"],
    github: "https://github.com/GlitchZap/nlp-summarizer",
    demo: "https://summarizer-ai.vercel.app",
    type: 'ai'
  },
  {
    title: "TaskFlow",
    description: "Kanban-style task management application with real-time collaboration features for teams and individuals.",
    image: "/taskflow.png",
    tags: ["React", "Firebase", "DnD", "Material UI"],
    github: "https://github.com/GlitchZap/taskflow",
    demo: "https://taskflow-app.vercel.app",
    type: 'web'
  }
];

// Project Card with Lens Effect component
const ProjectCardWithLens = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring animations for smooth cursor following
  const cursorX = useSpring(0, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    cursorX.set(x);
    cursorY.set(y);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-purple-900/20 via-black/70 to-blue-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 group h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Lens effect */}
      {isHovered && (
        <motion.div 
          className="absolute pointer-events-none z-10"
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), inset 0 0 20px rgba(147, 51, 234, 0.3)'
          }}
        />
      )}
      
      {/* Image with zoom effect */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        
        {/* Type badge */}
        {project.type && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-md bg-black/40 backdrop-blur-sm border border-white/10 z-10">
            {project.type === 'web' && 'Web App'}
            {project.type === 'mobile' && 'Mobile App'}
            {project.type === 'ai' && 'AI Project'}
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <motion.h3 
            className="text-xl font-bold text-white"
            animate={{ color: isHovered ? '#c4b5fd' : '#ffffff' }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          {project.featured && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
              Featured
            </span>
          )}
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        {/* Tags with animation */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, idx) => (
            <motion.span 
              key={idx}
              initial={false}
              animate={{ 
                y: isHovered ? -2 : 0,
                backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 58, 138, 0.3)'
              }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="px-2 py-1 border border-blue-500/30 rounded-md text-xs text-blue-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {/* Links with reveal animation */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
          <motion.a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer" 
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            initial={false}
            animate={{ 
              x: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          >
            <FaGithub className="group-hover:text-purple-400" /> 
            <span>GitHub</span>
          </motion.a>
          <motion.a 
            href={project.demo} 
            target="_blank" 
            rel="noreferrer" 
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            initial={false}
            animate={{ 
              x: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FaExternalLinkAlt className="group-hover:text-blue-400" /> 
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter projects based on type and search term
  const filteredProjects = allProjects.filter(project => {
    const matchesType = filter === 'all' || project.type === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/#projects" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 group">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            All <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Projects</span>
          </h1>
          
          <p className="text-gray-400 max-w-3xl">
            Browse my complete portfolio of projects, spanning web applications, mobile apps, and AI solutions. 
            Each project represents unique challenges and demonstrates different aspects of my technical capabilities.
          </p>
        </motion.div>
        
        {/* Filters and search */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 bg-black/30 p-1 rounded-lg border border-white/10 backdrop-blur-sm">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'all' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('web')}
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'web' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Web
            </button>
            <button 
              onClick={() => setFilter('mobile')}
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'mobile' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Mobile
            </button>
            <button 
              onClick={() => setFilter('ai')}
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'ai' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              AI
            </button>
          </div>
          
          <div className="relative w-full md:w-72">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
            />
          </div>
        </motion.div>
        
        {/* Projects grid with lens effect cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCardWithLens key={project.title} project={project} />
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-gray-400"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mb-4 text-gray-600"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-center">
              No projects match your current filters. <br/>
              Try adjusting your search or filter criteria.
            </p>
            <button 
              onClick={() => {setFilter('all'); setSearchTerm('');}}
              className="mt-4 px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-md hover:bg-purple-600/30 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
      </div>
    </main>
  );
}