"use client";

import React, { useRef } from "react";
import { HiCalendar, HiLocationMarker, HiAcademicCap, HiBriefcase } from "react-icons/hi";

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
  },
  {
    id: 7,
    title: "Frontend Developer Intern",
    organization: "Navdeep Shipping & Container Yard",
    date: "May 2025 – Jul 2025",
    location: "Remote",
    description: [
      "Developed and deployed a production-grade company website using React, TypeScript, and TailwindCSS (mega-marinect.in).",
      "Built responsive UI components and optimized performance for seamless experience across devices.",
      "Implemented modern UI/UX with animations using Framer Motion, improving user engagement.",
      "Collaborated on real-world requirements and delivered features in a paid internship (10K/month)."
    ],
    type: "experience",
    technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"]
  },
  {
    id: 8,
    title: "iOS Student Developer Program",
    organization: "SRM × Apple × Infosys",
    date: "Jul 2025 – Present",
    location: "Remote",
    description: [
      "Built reusable components using Swift, improving development efficiency.",
      "Optimized debugging and version control workflows using Git.",
      "Delivered features through iterative Agile sprint cycles"
    ],
    type: "education",
    technologies: ["iOS", "Swift", "Git", "Agile"]
  },
  {
    id: 9,
    title: "iOS Developer Intern",
    organization: "Infosys",
    date: "Mar 2026",
    location: "Mysore",
    description: [
      "Delivered modular features integrating REST APIs, reducing integration time by ∼25%.",
      "Led Agile (SCRUM) execution as Scrum Master for a 5+ member team, improving sprint efficiency.",
      "Translated product requirements into scalable technical solutions with focus on performance.",
      "Streamlined backend-aligned workflows, reducing inconsistencies in API interactions."
    ],
    type: "experience",
    technologies: ["iOS", "Swift", "REST APIs", "Agile", "SCRUM"]
  }
];

// Timeline item component (Animations removed)
const TimelineItem = ({ item, index }: { item: TimelineItem, index: number }) => {
  return (
    <div className="relative mb-12">
      {/* Timeline connector */}
      <div className="absolute left-5 top-7 transform -translate-x-1/2 h-full w-0.5">
        <div className="h-full bg-gradient-to-b from-purple-500 to-blue-500 w-full rounded-full" />
      </div>
      
      <div className="flex gap-8">
        {/* Timeline icon */}
        <div 
          className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-purple-500 bg-black flex items-center justify-center shadow-lg shadow-purple-500/20"
          style={{
            background: "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))"
          }}
        >
          {item.type === "experience" ? (
            <HiBriefcase className="text-purple-500 text-lg" />
          ) : (
            <HiAcademicCap className="text-blue-500 text-lg" />
          )}
        </div>
        
        {/* Content card */}
        <div className="flex-1 bg-gradient-to-br from-purple-900/20 via-black/60 to-blue-900/20 rounded-xl border border-white/10 backdrop-blur-md overflow-hidden shadow-lg shadow-purple-900/5 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
          {/* Card content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-purple-400 font-medium">{item.organization}</p>
              </div>
              
              <div className="mt-2 md:mt-0 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm flex items-center justify-center whitespace-nowrap">
                <HiCalendar className="mr-1" /> {item.date}
              </div>
            </div>
            
            <div className="flex items-center mb-4 text-gray-400 text-sm">
              <HiLocationMarker className="mr-1 flex-shrink-0" /> {item.location}
            </div>
            
            <div className="space-y-2 mb-4">
              {item.description.map((desc, i) => (
                <div key={i} className="flex items-start text-gray-300">
                  <span className="mr-2 mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            
            {/* Technologies */}
            {item.technologies && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md border border-blue-500/20 bg-blue-900/20 text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExperienceEducationSection() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 relative z-10">
        {/* Static section header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Experience & <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Education</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            My professional journey and academic background that have shaped my expertise in web development
            and design, with a focus on creating exceptional user experiences.
          </p>
        </div>

        {/* Floating markers indicating experience vs education */}
        <div className="flex justify-center gap-8 mb-16">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500 flex items-center justify-center">
              <HiBriefcase className="text-purple-500 text-xs" />
            </div>
            <span className="text-purple-400">Experience</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-500 flex items-center justify-center">
              <HiAcademicCap className="text-blue-500 text-xs" />
            </div>
            <span className="text-blue-400">Education</span>
          </div>
        </div>
        
        {/* Timeline container with enhanced spacing */}
        <div className="max-w-4xl mx-auto pl-7 md:pl-0">
          {/* Timeline items */}
          <div>
            {timelineData.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
          
          {/* Bottom indicator */}
          <div className="w-16 h-16 mx-auto mt-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 font-bold">Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}