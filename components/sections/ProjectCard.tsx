'use client';

import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  index: number;
  onClick?: () => void;
}

export function ProjectCard({ title, description, index, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`border border-brand-white p-8 transition-all duration-500 cursor-pointer group ${
        isHovered ? 'bg-brand-white text-brand-black transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <span className="text-6xl font-bold opacity-20 group-hover:opacity-100 transition-opacity">
          0{index}
        </span>
      </div>
      
      <p className="text-lg leading-relaxed">{description}</p>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-brand-white group-hover:bg-brand-black rounded-full transition-colors"></div>
          <div className="w-3 h-3 bg-brand-white group-hover:bg-brand-black rounded-full transition-colors"></div>
          <div className="w-3 h-3 bg-brand-white group-hover:bg-brand-black rounded-full transition-colors"></div>
        </div>
        <span className="text-sm uppercase tracking-wider opacity-70 group-hover:opacity-100">
          View Project →
        </span>
      </div>
    </div>
  );
}