"use client";

import { useState } from "react";
import { experiences } from "../data/experience";
import ExperienceCard from "./ExperienceCard";
import { AnimatePresence } from "framer-motion";

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="space-y-4 mb-20 text-center md:text-left">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(251,146,60,0.15)]">
            The Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]">Milestones</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Side (Timeline) - 40% (lg:col-span-5) */}
          <div className="lg:col-span-5 relative">
             <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-orange-500 via-blue-500/50 to-transparent"></div>
             
             <div className="space-y-12 relative">
                {experiences.map((exp, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div 
                      key={exp.id}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(e) => {
                         if (e.key === 'Enter' || e.key === ' ') {
                           e.preventDefault();
                           setActiveIndex(index);
                         }
                      }}
                      role="button"
                      tabIndex={0}
                      className={`relative flex items-start gap-8 cursor-pointer group outline-none transition-all duration-300 ${isActive ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
                    >
                       {/* Timeline Dot */}
                       <div className="relative flex-shrink-0 mt-1.5 z-10 w-8 h-8 flex items-center justify-center">
                          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isActive ? "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] scale-150" : "bg-white/20 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.8)]"}`}></div>
                       </div>

                       {/* Timeline Content */}
                       <div className="flex-1 transition-all duration-300">
                         <div className={`text-sm tracking-widest font-bold mb-1 uppercase ${isActive ? "text-orange-400" : "text-gray-500"}`}>
                           {exp.period}
                         </div>
                         <h4 className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-white drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" : "text-gray-400 group-hover:text-blue-200"}`}>
                           {exp.company}
                         </h4>
                         <div className={`mt-1 font-medium transition-colors duration-300 ${isActive ? "text-gray-300" : "text-gray-500"}`}>
                           {exp.role}
                         </div>
                       </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Right Side (Animated Panel) - 60% (lg:col-span-7) */}
          <div className="lg:col-span-7 min-h-[400px]">
             <AnimatePresence mode="wait">
                <ExperienceCard key={experiences[activeIndex].id} experience={experiences[activeIndex]} />
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
