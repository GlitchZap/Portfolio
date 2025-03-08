"use client";
import React from "react";
import { motion } from "framer-motion";
import Pin3D from "../ui/Pin3D";
import { FaCode, FaDatabase, FaTools, FaDesktop, FaServer } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      content: "C++, C, Java, JavaScript, Python, HTML, CSS",
      icon: <FaCode />
    },
    {
      title: "Frontend",
      content: "React.js, TailwindCSS, HTML5, CSS3, JavaScript",
      icon: <FaDesktop />
    },
    {
      title: "Backend & Database",
      content: "MySQL, Flask, Firebase, FastAPI, TensorFlow",
      icon: <FaServer />
    },
    {
      title: "Tools & Platforms",
      content: "VSCode, PyCharm, Git, GitHub, Figma, Eclipse, IntelliJ",
      icon: <FaTools />
    },
    {
      title: "AI & Machine Learning",
      content: "TensorFlow, Computer Vision, Deep Learning",
      icon: <SiTensorflow />
    },
    {
      title: "Soft Skills",
      content: "Leadership, UI/UX Design, Critical Thinking, Problem Solving",
      icon: <FaDatabase />
    },
  ];

  return (
    <section id="skills" className="w-full py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            My technical toolkit spans multiple domains, from front-end development to AI and machine learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Pin3D 
                title={category.title}
                content={category.content}
                icon={category.icon}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-purple-900/30 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-lg">
              CSS (HackerRank)
            </span>
            <span className="bg-blue-900/30 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-lg">
              Beginning C++ Programming (Udemy)
            </span>
            <span className="bg-green-900/30 border border-green-500/20 text-green-300 px-4 py-2 rounded-lg">
              Python Basic (HackerRank)
            </span>
            <span className="bg-yellow-900/30 border border-yellow-500/20 text-yellow-300 px-4 py-2 rounded-lg">
              IBM Python for Data Science and AI
            </span>
            <span className="bg-red-900/30 border border-red-500/20 text-red-300 px-4 py-2 rounded-lg">
              C, C++, Python and Ruby Programming (Udemy)
            </span>
            <span className="bg-indigo-900/30 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-lg">
              AWS Graduate - Cloud Foundation and Data Engineering
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;