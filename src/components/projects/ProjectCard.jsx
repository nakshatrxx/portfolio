import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Briefcase, Globe } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const ProjectCard = ({ project, onOpenCaseStudy }) => {
  const isFlagship = project.isFlagship;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 border flex flex-col justify-between ${
        isFlagship
          ? 'bg-gradient-to-br from-curry-blue/20 via-surface to-surface border-curry-gold/40 shadow-2xl hover:border-curry-gold'
          : 'glass-panel border-white/10 hover:border-white/25 hover:bg-surface-hover'
      }`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-curry-gold/5 rounded-full blur-3xl group-hover:bg-curry-gold/10 transition-colors pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/10 text-curry-gold font-bold">
              {project.index}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              {project.category}
            </span>
          </div>

          {isFlagship ? (
            <span className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-curry-gold/20 text-curry-gold border border-curry-gold/40 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>Flagship Work</span>
            </span>
          ) : (
            <span className="text-xs font-mono text-zinc-500">
              {project.timeline}
            </span>
          )}
        </div>

        {project.company && (
          <div className="mb-2 flex items-center gap-1.5 text-xs font-mono text-blue-300">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{project.company}</span>
          </div>
        )}

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white group-hover:text-curry-gold transition-colors">
          {project.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          {project.tagline}
        </p>

        {/* Live Client Deployments for Freelance Projects */}
        {project.clients && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-zinc-400">
              <Globe className="w-3 h-3 text-curry-gold" />
              <span>Live Client Deployments</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.clients.map((client, idx) => (
                <a
                  key={idx}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                  }}
                  className="group/client p-3.5 rounded-2xl bg-white/[0.04] hover:bg-curry-gold/15 border border-white/10 hover:border-curry-gold/50 transition-all duration-200 flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span className="text-xs font-bold font-display text-white group-hover/client:text-curry-gold transition-colors truncate">
                      {client.name}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold shrink-0 ${
                      client.status === 'In Progress' 
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' 
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-zinc-400 group-hover/client:text-curry-gold truncate">
                    <span>{client.domain}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/client:translate-x-0.5 group-hover/client:-translate-y-0.5 transition-transform shrink-0" />
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1.5 leading-snug">
                    {client.tag}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-1.5 sm:gap-2">
          {project.tech?.slice(0, 5).map((t, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 group-hover:border-white/20 transition-colors"
            >
              {t}
            </span>
          ))}
          {project.tech?.length > 5 && (
            <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 text-zinc-500">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {project.stats?.[0] && (
            <div>
              <div className="text-xs font-bold font-mono text-white">{project.stats[0].value}</div>
              <div className="text-[10px] font-mono text-zinc-500">{project.stats[0].label}</div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onOpenCaseStudy(project);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
            isFlagship
              ? 'bg-curry-gold text-black font-bold hover:bg-white shadow-lg'
              : 'bg-white/10 text-white hover:bg-curry-gold hover:text-black'
          }`}
        >
          <span>Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
