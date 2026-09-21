import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Briefcase, UserCheck, Globe } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';
import { sounds } from '../../utils/soundEffects';

export const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const professionalProjects = projectsData.filter(p => p.categoryType === 'professional');
  const personalProjects = projectsData.filter(p => p.categoryType === 'personal');
  const freelanceProjects = projectsData.filter(p => p.categoryType === 'freelance');

  return (
    <section id="work" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-widest mb-2">
            <span>01 // Selected Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white uppercase">
            Engineered Case Studies
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
          Production AI systems, autonomous RAG retrieval pipelines, and full-stack web products built for real users.
        </p>
      </div>

      {/* 1. PROFESSIONAL WORK (SVASU) */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Professional Engineering Experience
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {professionalProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenCaseStudy={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* 2. PERSONAL AI & FULL-STACK PROJECTS */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <UserCheck className="w-4 h-4 text-curry-gold" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Personal Projects & System Explorations
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenCaseStudy={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* 3. FREELANCE & CLIENT WORK */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Freelance & Commercial Client Deployments
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {freelanceProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenCaseStudy={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal Viewer */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          allProjects={projectsData}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      )}
    </section>
  );
};
