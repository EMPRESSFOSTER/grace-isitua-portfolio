"use client";

import { motion } from "framer-motion";
import { type Experience } from "../data/experience";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 sm:p-10 shadow-[0_0_40px_rgba(168,85,247,0.1)] overflow-hidden"
    >
      {/* Optimized decorative glow - only visible on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/30 to-transparent blur-2xl rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div>
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-blue-500 mb-2">
            {experience.company}
          </h3>
          <div className="text-xl font-medium text-white mb-1">{experience.role}</div>
          <div className="text-sm font-semibold tracking-wider text-blue-400/80 uppercase">
            {experience.period}
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed">
          {experience.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {experience.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase bg-white/5 border border-white/10 rounded-full transition-colors duration-200 hover:bg-white/10 hover:border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
