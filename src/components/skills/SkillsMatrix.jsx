import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Terminal, Sparkles, Check } from 'lucide-react';
import { skillsData } from '../../data/skills';

export const SkillsMatrix = () => {
  const iconMap = {
    Brain: Brain,
    Layers: Layers,
    Terminal: Terminal
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-widest mb-2">
            <span>04 // Technical Arsenal</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white uppercase">
            Curated Capabilities
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
          A focused stack centered on Generative AI, high-reliability backend systems, and modern interactive frontends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(skillsData).map(([key, group], idx) => {
          const Icon = iconMap[group.icon] || Sparkles;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl p-6 sm:p-7 glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-curry-gold">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Tier 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white">
                  {group.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {group.description}
                </p>

                <div className="mt-6 space-y-2 pt-4 border-t border-white/10">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-curry-gold/20 transition-colors"
                    >
                      <span className="text-xs font-mono text-zinc-200">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-curry-gold border border-curry-gold/20">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
