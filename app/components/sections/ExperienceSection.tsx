"use client";
import React from "react";
import { motion } from "framer-motion";
import ContainerScroll from "../ui/ContainerScroll";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

interface TimelineItemProps {
  date: string;
  title: string;
  organization: string;
  description: string[];
  icon: React.ReactNode;
  delay?: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, organization, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      viewport={{ once: true }}
      className="relative flex gap-6 pb-8 group"
    >
      {/* Timeline line */}
      <div className="absolute top-0 left-[25px] h-full w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 group-last:bg-transparent"></div>
      
      {/* Icon */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 shadow-md border border-white/10">
        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col pt-1">
        <div className="mb-1 text-sm text-neutral-400">{date}</div>
        <div className="mb-1">
          <span className="text-xl font-medium text-white">{title}</span>
          <span className="text-lg text-neutral-300"> • {organization}</span>
        </div>
        <div className="text-neutral-300 space-y-2">
          {description.map((item, index) => (
            <p key={index} className="text-sm">{item}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      date: "April 2024 - June 2024",
      title: "Virtual Intern",
      organization: "Google for Developers",
      description: [
        "Completed hands-on projects in image classification, object detection, and product image search using Google's ML Kit and Vision API.",
        "Worked on back-end development for Vision API Product Search, implementing AI-powered image recognition.",
        "Enhanced skills in computer vision, deep learning, and mobile AI integration, applying Google Cloud and TensorFlow technologies."
      ],
      icon: <FaBriefcase />
    },
    {
      date: "December 2024",
      title: "Software Engineering Virtual Experience",
      organization: "Electronic Arts",
      description: [
        "Proposed a new feature for Sims 4 and wrote a Feature Proposal describing it to other stakeholders.",
        "Built a class diagram and created a header file in C++ with class definitions for each object.",
        "Patched a bugfix and optimized the Sims 4 codebase by implementing an improved data structure."
      ],
      icon: <FaBriefcase />
    },
    {
      date: "August 2023 - January 2024",
      title: "Marketing Associate",
      organization: "Winzera Pvt. Ltd.",
      description: [
        "Actively participated in networking events, business meetings, and workshops to improve interpersonal communication.",
        "Delved deep into LLMs, B2B, B2C and various business transactions.",
        "Worked with professionals to get a clear understanding of industries and how a startup works.",
        "Focused on expanding customer reach and promoting company products/services."
      ],
      icon: <FaBriefcase />
    },
    {
      date: "June 2024",
      title: "Product Design Virtual Participant",
      organization: "Accenture, Forage",
      description: [
        "Completed a simulation focused on how the Product Design team can transform a user's experience.",
        "Added a new feature and iterated on an existing product screen.",
        "Communicated the decisions made for the feature design."
      ],
      icon: <FaBriefcase />
    },
  ];

  const education = [
    {
      date: "May 2023 - June 2027",
      title: "B.Tech in Computer Science and Engineering",
      organization: "SRM Institute of Science and Technology",
      description: ["GPA: 9.21/10.0 (till 3rd sem)"],
      icon: <FaGraduationCap />
    },
    {
      date: "April 2007 - March 2023",
      title: "Schooling",
      organization: "Gyan Mandir Public School",
      description: ["10th Grades: 89%", "12th Grades: 76%"],
      icon: <FaGraduationCap />
    }
  ];

  const titleComponent = (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
      >
        Experience & Education
      </motion.h2>
      <div className="w-20 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mx-auto mb-6"></div>
    </div>
  );

  return (
    <section id="experience" className="w-full py-20 bg-black">
      <ContainerScroll titleComponent={titleComponent}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center"
            >
              <FaBriefcase className="mr-3 text-purple-500" /> Professional Experience
            </motion.h3>
            
            <div>
              {experiences.map((experience, index) => (
                <TimelineItem key={index} {...experience} delay={index} />
              ))}
            </div>
          </div>
          
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center"
            >
              <FaGraduationCap className="mr-3 text-blue-500" /> Education
            </motion.h3>
            
            <div>
              {education.map((edu, index) => (
                <TimelineItem key={index} {...edu} delay={index} />
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default ExperienceSection;