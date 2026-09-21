import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, ExternalLink, CheckCircle2, Layers, Cpu, Database, ShieldAlert, Sparkles, Briefcase } from 'lucide-react';
import { SvasuPipeline } from './SvasuPipeline';
import { sounds } from '../../utils/soundEffects';

export const CaseStudyModal = ({ project, onClose, onSelectProject, allProjects }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl z-10 text-white"
        >
          {/* Top Bar / Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 sticky top-0 bg-[#111115]/90 backdrop-blur-md -mt-2 -mx-2 px-2 pt-2 z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm px-2.5 py-1 rounded bg-white/10 text-curry-gold font-bold">
                {project.index}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {project.category}
              </span>
              {project.company && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-blue-300 bg-curry-blue/30 px-2.5 py-0.5 rounded border border-curry-blue/50">
                  <Briefcase className="w-3 h-3" /> {project.company}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header Info */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.badges?.map((badge, idx) => (
                <span key={idx} className="text-xs font-mono px-3 py-1 rounded-full bg-curry-gold/10 text-curry-gold border border-curry-gold/25">
                  {badge}
                </span>
              ))}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
              {project.title}
            </h2>

            <p className="text-base sm:text-xl text-zinc-300 font-sans leading-relaxed">
              {project.subtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {project.role && (
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Role</div>
                  <div className="text-sm font-semibold text-zinc-200 mt-0.5">{project.role}</div>
                </div>
              )}
              {project.timeline && (
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Timeline</div>
                  <div className="text-sm font-semibold text-zinc-200 mt-0.5">{project.timeline}</div>
                </div>
              )}
              <div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase">Type</div>
                <div className="text-sm font-semibold text-curry-gold mt-0.5">{project.category}</div>
              </div>
              {project.company && (
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">Employer</div>
                  <div className="text-sm font-semibold text-zinc-200 mt-0.5 truncate">{project.company.split('-')[0]}</div>
                </div>
              )}
            </div>
          </div>

          {/* SVASU Pipeline Embed if flagship */}
          {project.id === "svasu" && (
            <div className="mt-8">
              <SvasuPipeline />
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>The Challenge</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">The Problem</h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-curry-gold/[0.03] border border-curry-gold/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>The Engineering Approach</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">The Solution</h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features or Highlights */}
          {(project.keyFeatures || project.architectureHighlights) && (
            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-base font-mono uppercase tracking-wider text-zinc-400 mb-4">
                Technical Highlights & Implementation
              </h4>
              <div className="space-y-3">
                {(project.keyFeatures || project.architectureHighlights).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-curry-gold shrink-0 mt-1" />
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mt-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
              Technology Arsenal
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech?.map((t, idx) => (
                <span key={idx} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          {project.stats && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.stats.map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-display text-curry-gold">{s.value}</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Prev / Next Project Navigation Footer */}
          <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
            {prevProject ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  onSelectProject(prevProject);
                }}
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Prev: {prevProject.title}</span>
              </button>
            ) : <div />}

            {nextProject ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  onSelectProject(nextProject);
                }}
                className="flex items-center gap-2 text-xs font-mono text-curry-gold hover:text-white transition-colors"
              >
                <span>Next: {nextProject.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
