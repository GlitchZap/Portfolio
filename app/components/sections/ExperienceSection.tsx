"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionTemplate } from "framer-motion";
import { HiCalendar, HiLocationMarker, HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { AccentricityBackground } from "../ui/aceternity/Container";

// Interface for timeline data
interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  location: string;
  description: string[];
  type: "experience" | "education";
  technologies?: string[];
}

// Timeline data - Updated with your experience and education
const timelineData: TimelineItem[] = [
    {
        id: 6,
        title: "High School Education",
        organization: "Gyan Mandir Public School",
        date: "April 2007 - March 2023",
        location: "School",
        description: [
          "10th Grades: 89%",
          "12th Grades: 76%",
          "Participated in various extracurricular activities"
        ],
        type: "education"
      },

  {
    id: 5,
    title: "B.Tech in Computer Science and Engineering",
    organization: "SRM Institute of Science and Technology",
    date: "May 2023 - June 2027",
    location: "Chennai",
    description: [
      "GPA: 9.21/10.0 (till 3rd sem)",
      "Focusing on Computer Science and Engineering",
      "Active participation in technical workshops and coding competitions"
    ],
    type: "education"
  },
  {
    id: 4,
    title: "Marketing Associate",
    organization: "Winzera Pvt. Ltd.",
    date: "Aug 2023 - Jan 2024",
    location: "Chennai",
    description: [
      "Event Participation and Soft Skills Development: Actively participated in networking events, business meetings, and workshops to improve interpersonal communication, negotiation, and presentation skills.",
      "Delve deep into LLMs, B2B, B2C and various business transactions. Gained hands-on experience in network marketing, focusing on B2B and B2C transactions.",
      "Worked with Professionals to get a clear understanding of Industries and how a Startup works",
      "Network Marketing Role: Focused on expanding customer reach and promoting company products/services by building strong relationships and using direct marketing strategies."
    ],
    type: "experience",
    technologies: ["Network Marketing", "B2B", "B2C", "Communication Skills", "LLMs"]
  },
  {
    id: 3,
    title: "EduSkills Virtual Intern",
    organization: "Google for Developers",
    date: "April 2024 - June 2024",
    location: "Remote",
    description: [
      "Completed hands-on projects in image classification, object detection, and product image search using Google's ML Kit and Vision API.",
      "Earned multiple badges for successfully completing tasks related to image classification, object detection, and Vision API product search.",
      "Worked on back-end development for Vision API Product Search, implementing AI-powered image recognition.",
      "Enhanced skills in computer vision, deep learning, and mobile AI integration, applying Google Cloud and TensorFlow technologies."
    ],
    type: "experience",
    technologies: ["Machine Learning", "Google Cloud", "TensorFlow", "Computer Vision", "ML Kit"]
  },
  {
    id: 2,
    title: "Product Design Virtual Participant",
    organization: "Accenture, Forage",
    date: "June 2024",
    location: "Remote",
    description: [
      "Completed a simulation focused on how the Product Design team can transform a user's experience",
      "Added a new feature and iterated on an existing product screen",
      "Communicated the decisions made for the feature design",
      "Accenture North America Product Design virtual experience program"
    ],
    type: "experience",
    technologies: ["Product Design", "UX Design", "UI/UX"]
  },

  {
    id: 1,
    title: "Electronic Arts Software Engineering",
    organization: "Electronic Arts",
    date: "December 2024",
    location: "Remote",
    description: [
      "Proposed a new feature for Sims 4 and wrote a Feature Proposal describing it to other stakeholders.",
      "Built a class diagram and created a header file in C++ with class definitions for each object.",
      "Patched a bugfix and optimized the Sims 4 codebase by implementing an improved data structure."
    ],
    type: "experience",
    technologies: ["C++", "Object-Oriented Design", "Game Development"]
  }



];

// Timeline item component with enhanced animations
const TimelineItem = ({ item, index }: { item: TimelineItem, index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.2, margin: "-100px 0px -100px 0px" });
  
  // Make cards enter from alternating sides
  const entryDirection = index % 2 === 0 ? -50 : 50;
  
  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, x: entryDirection, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0.3, x: entryDirection / 2, scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 40,
        damping: 15, 
        mass: 0.5, 
        delay: index * 0.05
      }}
      className="relative mb-12"
    >
      {/* Timeline connector */}
      <div className="absolute left-5 top-7 transform -translate-x-1/2 h-full w-0.5">
        <motion.div 
          className="h-full bg-gradient-to-b from-purple-500 to-blue-500 w-full rounded-full"
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex gap-8">
        {/* Timeline icon */}
        <motion.div 
          className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-purple-500 bg-black flex items-center justify-center shadow-lg shadow-purple-500/20"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
          style={{
            background: "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))"
          }}
        >
          {item.type === "experience" ? (
            <HiBriefcase className="text-purple-500 text-lg" />
          ) : (
            <HiAcademicCap className="text-blue-500 text-lg" />
          )}
        </motion.div>
        
        {/* Content card */}
        <motion.div 
          className="flex-1 bg-gradient-to-br from-purple-900/20 via-black/60 to-blue-900/20 rounded-xl border border-white/10 backdrop-blur-md overflow-hidden shadow-lg shadow-purple-900/5"
          whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.15)" }}
        >
          {/* Card content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-purple-400 font-medium">{item.organization}</p>
              </div>
              
              <motion.div 
                className="mt-2 md:mt-0 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm flex items-center justify-center whitespace-nowrap"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.4 }}
              >
                <HiCalendar className="mr-1" /> {item.date}
              </motion.div>
            </div>
            
            <div className="flex items-center mb-4 text-gray-400 text-sm">
              <HiLocationMarker className="mr-1 flex-shrink-0" /> {item.location}
            </div>
            
            <div className="space-y-2 mb-4">
              {item.description.map((desc, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-start text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <span className="mr-2 mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span>{desc}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Technologies */}
            {item.technologies && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md border border-blue-500/20 bg-blue-900/20 text-blue-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.4 + (i * 0.05) }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ExperienceEducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"] 
  });
  
  // Make scroll progress smoother with spring physics
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Transform values for background and header parallax effects
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const bgYString = useMotionTemplate`${bgY}`;
  const titleY = useTransform(smoothProgress, [0, 0.3], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Accentricity Background for consistent look */}
      <AccentricityBackground 
        variant="grid"
        intensity={0.5}
        style={{ y: bgYString.get() }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Animated section header */}
        <motion.div 
          className="text-center mb-20"
          style={{ 
            opacity,
            y: titleY
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Experience & <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Education</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            My professional journey and academic background that have shaped my expertise in web development
            and design, with a focus on creating exceptional user experiences.
          </p>
        </motion.div>

        {/* Floating markers indicating experience vs education */}
        <div className="flex justify-center gap-8 mb-16">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500 flex items-center justify-center">
              <HiBriefcase className="text-purple-500 text-xs" />
            </div>
            <span className="text-purple-400">Experience</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-500 flex items-center justify-center">
              <HiAcademicCap className="text-blue-500 text-xs" />
            </div>
            <span className="text-blue-400">Education</span>
          </motion.div>
        </div>
        
        {/* Timeline container with enhanced spacing */}
        <div className="max-w-4xl mx-auto pl-7 md:pl-0" ref={timelineRef}>
          {/* Timeline items with staggered animations */}
          <div>
            {timelineData.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
          
          {/* Bottom indicator */}
          <motion.div 
            className="w-16 h-16 mx-auto mt-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              delay: 0.5
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
                       <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 font-bold">Now</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
          