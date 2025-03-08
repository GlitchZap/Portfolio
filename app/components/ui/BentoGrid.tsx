"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BentoGridItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  url?: string;
  delay?: number;
}

export const BentoGridItem = ({
  title,
  description,
  header,
  icon,
  className,
  url,
  delay = 0,
}: BentoGridItemProps) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className={`row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300
        border border-white/10 justify-between flex flex-col space-y-4
        bg-gradient-to-br from-neutral-900 to-neutral-800
        overflow-hidden ${className}`}
    >
      {header && <div className="w-full">{header}</div>}
      <div className="p-4 md:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between">
          {icon && <div className="p-2">{icon}</div>}
          <motion.h3 
            className="text-xl font-bold text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: (delay * 0.1) + 0.1 }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p 
          className="mt-2 text-sm text-neutral-300 flex-grow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (delay * 0.1) + 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );

  return url ? (
    <Link href={url} target="_blank" className="outline-none">
      {content}
    </Link>
  ) : (
    content
  );
};

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 ${className}`}>
      {children}
    </div>
  );
};