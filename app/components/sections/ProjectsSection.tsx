"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AccentricityBackground } from "../ui/aceternity/Container";
import { LensMagnifier } from "../ui/lens-magnifier";
import { cn } from "../../lib/utils";
import {
  HiCode,
  HiExternalLink,
  HiLightningBolt,
  HiChip,
  HiGlobe,
  HiArrowRight,
} from "react-icons/hi";

// Project data
const projects = [
  {
    id: 1,
    title: "Treasure Hunt AI-Searching Techniques",
    description:
      "Developed interactive treasure hunt visualization in React showcasing DFS, BFS, and A* algorithms. Implemented priority queue and graph traversal techniques with responsive step-by-step animation.",
    image: "/project1.jpg",
    category: "Algorithms & Visualization",
    liveLink: "https://treasure-hunt-ai-searching-techniques.vercel.app/",
    githubLink: "https://github.com/GlitchZap/Treasure-Hunt-AISearchingTechniques",
    technologies: ["React", "A* Algorithm", "DFS", "BFS", "Data Structures"],
    icon: <HiLightningBolt className="text-blue-400 w-8 h-8" />,
    featured: true,
    bgColor: "from-blue-900/20 via-black/60 to-purple-900/20",
    accentColor: "blue",
  },
  {
    id: 2,
    title: "Dynamic Grid System",
    description:
      "Built dynamic grid system with configurable parameters and real-time performance analytics dashboard. Leveraged React hooks for state management with Tailwind CSS for responsive design.",
    image: "/onboardx.png",
    category: "Web Development",
    liveLink: "https://example.com/",
    githubLink: "https://github.com/GlitchZap/",
    technologies: ["React", "Hooks", "Tailwind CSS", "Analytics Dashboard"],
    icon: <HiChip className="text-emerald-400 w-8 h-8" />,
    featured: true,
    bgColor: "from-emerald-900/20 via-black/60 to-blue-900/20",
    accentColor: "emerald",
  },
  {
    id: 3,
    title: "Zombie Escape - 2D Survival Game",
    description:
      "Developed a 2D grid-based zombie survival game featuring real-time pathfinding. Implemented the A* algorithm for intelligent zombie movement and player navigation. Designed dynamic difficulty scaling by adjusting grid size and obstacles for varied gameplay.",
    image: "/project2.jpg",
    category: "Game Development",
    liveLink: "https://dead-run-zombie-escapev2.vercel.app/",
    githubLink: "https://github.com/GlitchZap/DeadRun-ZombieEscapev2",
    technologies: ["A* Pathfinding", "Game Development", "Real-time Interactions", "UI/UX Design"],
    icon: <HiGlobe className="text-purple-400 w-8 h-8" />,
    featured: true,
    bgColor: "from-purple-900/20 via-black/60 to-indigo-900/20",
    accentColor: "purple",
  },
  {
    id: 4,
    title: "Frontend Website Replications",
    description:
      "Developed multiple responsive website clones, including a Netflix clone, using HTML, CSS, and @media queries for adaptability across different screen sizes. Implemented mobile-first design principles to ensure a seamless user experience on various devices.",
    image: "/project4.jpg",
    category: "Frontend Development",
    liveLink: "https://github.com/GlitchZap/",
    githubLink: "https://github.com/GlitchZap/",
    technologies: ["HTML", "CSS", "Flexbox", "Grid", "Responsive Design"],
    icon: <HiCode className="text-red-400 w-8 h-8" />,
    featured: false,
    bgColor: "from-red-900/20 via-black/60 to-orange-900/20",
    accentColor: "red",
  }
];

// Project card component with lens magnification effect
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
  icon: JSX.Element;
  featured: boolean;
  bgColor: string;
  accentColor: string;
}

const ProjectCard = ({ project, className }: { project: Project; className?: string }) => {
  // Get the appropriate accent color for hover states
  const accentColorClass = `${project.accentColor}-500`;

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1",
        project.bgColor,
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-1 flex-col gap-4">
        {/* Project Header with Lens Effect */}
        <div className="h-52 w-full overflow-hidden rounded-t-xl">
          <LensMagnifier>
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
            </div>
          </LensMagnifier>
          
          {/* Project Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="text-sm font-medium text-gray-300 bg-black/50 px-3 py-1 rounded-full">
              {project.category}
            </div>
          </div>
          
          {/* Project Icon */}
          <div className="absolute top-4 left-4 z-10">
            <div className={`inline-flex rounded-xl border border-${accentColorClass}/30 bg-${accentColorClass}/10 p-3`}>
              {project.icon}
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="flex flex-col gap-2 p-6">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-3">{project.description}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            {project.technologies.slice(0, 3).map((tech: string, i: number) => (
              <span
                key={i}
                className={`rounded-md border border-${accentColorClass}/30 bg-${accentColorClass}/10 px-2 py-1 text-xs text-${accentColorClass} backdrop-blur-md`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-400">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Project Links */}
      <div className="p-6 pt-0">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 rounded-lg border border-${accentColorClass}/50 bg-${accentColorClass}/20 px-3 py-1.5 text-sm font-medium text-${accentColorClass} transition-all duration-300 hover:bg-${accentColorClass}/30`}
          >
            <HiExternalLink className="text-lg" />
            <span>Live Preview</span>
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-white/10"
          >
            <HiCode className="text-lg" />
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animations with spring physics for smoother effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smoother scroll progress with spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const bgYStyle = useMotionTemplate`${bgY}`;


  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-32">
      {/* Accentricity Background */}
      <AccentricityBackground
        variant="circuit"
        intensity={0.5}
        style={{ y: bgYStyle } as React.CSSProperties}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
            My <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            A collection of my recent projects showcasing my skills and expertise in various technologies.
            Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        {/* Well-organized Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Featured Project - Takes 2/3 of the grid */}
          <div className="col-span-1 md:col-span-6 lg:col-span-8">
            <ProjectCard project={projects[0]} className="h-full" />
          </div>
          
          {/* Second Project - Takes 1/3 of the grid */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <ProjectCard project={projects[1]} className="h-full" />
          </div>
          
          {/* Third Project - Takes 1/3 of the grid */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4">
            <ProjectCard project={projects[2]} className="h-full" />
          </div>
          
          {/* Fourth Project - Takes 2/3 of the grid */}
          <div className="col-span-1 md:col-span-3 lg:col-span-8">
            <ProjectCard project={projects[3]} className="h-full" />
          </div>
        </div>

        {/* View More Button redirecting to /projects */}
        <div className="mt-16 text-center">
          <Link href="/projects">
            <motion.button
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600/80 to-blue-600/80 px-8 py-4 font-medium text-white transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
              <span className="flex items-center">
                View All Projects
                <HiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}