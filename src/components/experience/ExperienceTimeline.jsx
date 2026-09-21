import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react';
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

      <div className="space-y-8">
        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`rounded-3xl p-6 sm:p-8 glass-panel border transition-all duration-300 ${
              exp.current ? 'border-curry-gold/40 shadow-xl' : 'border-white/10'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white font-semibold">
                    {exp.role}
                  </span>
                  {exp.current && (
                    <span className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Current Position</span>
                    </span>
                  )}
                  <span className="text-xs font-mono text-zinc-500">
                    ({exp.type})
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
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
            <p className="mt-5 text-sm sm:text-base text-curry-gold font-medium font-sans">
              {exp.highlight}
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
          </motion.div>
        ))}

        {/* Education Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 sm:p-8 glass-panel border border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-curry-gold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase">Education</span>
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
        </motion.div>
      </div>
    </section>
  );
};
