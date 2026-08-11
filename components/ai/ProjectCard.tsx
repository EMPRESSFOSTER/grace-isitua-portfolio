'use client';

// components/ai/ProjectCard.tsx
// Renders a formatted project recommendation card in the chat

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export interface Project {
  title: string;
  category: string;
  description: string;
  technologies?: string[];
  image?: string;
  url?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-purple-500/30 transition-all duration-300 group">
      {project.image && (
        <div className="relative h-32 w-full overflow-hidden bg-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            className="group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-2 left-3 text-xs text-white/60 font-medium">
            {project.category}
          </div>
        </div>
      )}
      <div className="p-3">
        <h4 className="text-white font-semibold text-sm mb-1">{project.title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed mb-2">{project.description}</p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View Project
          </a>
        )}
      </div>
    </div>
  );
}
