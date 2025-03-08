"use client";
import React from "react";
import { motion } from "framer-motion";

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="px-4 py-2 bg-gray-800 flex items-center">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <p className="text-gray-400 text-sm">{language}</p>
      </div>
      
      <motion.div
        className="bg-gray-900 p-4 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <pre className="text-white font-mono text-sm">
          <code>{code}</code>
        </pre>
      </motion.div>
    </div>
  );
};

export default CodeBlock;