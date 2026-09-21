import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, CheckCircle2, Sparkles, Briefcase, Zap } from 'lucide-react';
import { experienceData, educationData } from '../../data/experience';

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-widest mb-2">
            <span>03 // Career Track</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white uppercase">
            Work Experience
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
          Engineering production AI solutions, scalable backend microservices, and client platforms.
        </p>
      </div>

      {/* Illuminated Vertical Circuit Milestone Track */}
      <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-4 border-l-2 border-dashed border-zinc-800 space-y-12">
        
        {/* Ambient circuit glow line overlay */}
        <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-curry-gold via-curry-blue to-emerald-500 opacity-60 pointer-events-none" />

        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Glowing Circuit Node on the Timeline Stem */}
            <div className={`absolute -left-[31px] sm:-left-[47px] top-6 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              exp.current
                ? 'bg-black border-curry-gold shadow-[0_0_16px_rgba(253,185,39,0.5)] scale-110'
                : 'bg-black border-zinc-700 group-hover:border-zinc-400'
            }`}>
              {exp.current ? (
                <span className="w-2.5 h-2.5 rounded-full bg-curry-gold animate-pulse" />
              ) : (
                <span className="text-[10px] font-mono font-bold text-zinc-400">0{idx + 1}</span>
              )}
            </div>

            {/* Experience Card */}
            <div className={`rounded-3xl p-6 sm:p-8 glass-panel border transition-all duration-300 ${
              exp.current
                ? 'border-curry-gold/40 shadow-2xl bg-gradient-to-br from-curry-blue/10 via-surface to-surface'
                : 'border-white/10 group-hover:border-white/25 hover:bg-surface-hover'
            }`}>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white font-semibold">
                      {exp.role}
                    </span>
                    {exp.current && (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Active Role</span>
                      </span>
                    )}
                    <span className="text-xs font-mono text-zinc-500">
                      ({exp.type})
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1 group-hover:text-curry-gold transition-colors">
                    {exp.company}
                  </h3>
                </div>

                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-curry-gold" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <p className="mt-5 text-sm sm:text-base text-curry-gold font-medium font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-curry-gold" />
                <span>{exp.highlight}</span>
              </p>

              {/* Responsibilities */}
              <div className="mt-4 space-y-2.5">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {resp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                {exp.tech.map((t, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Education Node Milestone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Circuit Node for Education */}
          <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-8 h-8 rounded-full bg-black border-2 border-curry-blue shadow-[0_0_12px_rgba(29,66,138,0.5)] flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-blue-400" />
          </div>

          <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 hover:border-white/20 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-curry-gold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-500 uppercase">Academic Foundation</span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {educationData.institution}
                  </h3>
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1 rounded-md border border-white/10 self-start sm:self-center">
                {educationData.period} · {educationData.location}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-base font-semibold text-white font-display">
                {educationData.degree} <span className="text-curry-gold font-mono text-sm">({educationData.specialization})</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {educationData.coursework.map((course, cIdx) => (
                  <span key={cIdx} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
