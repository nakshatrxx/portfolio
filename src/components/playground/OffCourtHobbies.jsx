import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Gauge, Gamepad2, Trophy, Zap, Shield, Sparkles } from 'lucide-react';
import { hobbiesData } from '../../data/hobbies';
import { BasketballEasterEgg } from './BasketballEasterEgg';
import { sounds } from '../../utils/soundEffects';

export const OffCourtHobbies = () => {
  const [activeCard, setActiveCard] = useState("basketball");

  return (
    <section id="playground" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-widest mb-2">
            <span>02 // The Locker Room</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white uppercase">
            Beyond The Terminal
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
          Curry range 3-pointers, high-telemetry motorsport engineering, and tactical esports precision.
        </p>
      </div>

      {/* 3-Point Shootout Interactive Canvas */}
      <BasketballEasterEgg />

      {/* Personality Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* 1. Stephen Curry & Basketball */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl glass-panel p-6 sm:p-7 border border-curry-gold/30 hover:border-curry-gold transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-curry-gold/15 text-curry-gold border border-curry-gold/30 font-bold">
                HOOPS · #30
              </span>
              <Flame className="w-5 h-5 text-curry-gold animate-pulse" />
            </div>

            <h3 className="text-2xl font-extrabold font-display text-white">
              {hobbiesData.basketball.heroHighlight}
            </h3>

            <p className="text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
              {hobbiesData.basketball.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Clutch Mantra</div>
              <p className="text-xs font-mono italic text-curry-gold">
                {hobbiesData.basketball.quote}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            {hobbiesData.basketball.stats.map((s, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-bold font-mono text-white truncate">{s.value}</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. Formula 1 */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl glass-panel p-6 sm:p-7 border border-f1-red/30 hover:border-f1-red transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-bold">
                MOTORSPORT · F1
              </span>
              <Gauge className="w-5 h-5 text-red-400" />
            </div>

            <h3 className="text-2xl font-extrabold font-display text-white">
              {hobbiesData.f1.heroHighlight}
            </h3>

            <p className="text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
              {hobbiesData.f1.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Engineering Philosophy</div>
              <p className="text-xs font-mono italic text-zinc-300">
                {hobbiesData.f1.quote}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            {hobbiesData.f1.stats.map((s, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-bold font-mono text-red-400 truncate">{s.value}</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. Gaming (Valorant & Marvel Rivals) */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl glass-panel p-6 sm:p-7 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold">
                ESPORTS · TACTICAL
              </span>
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
            </div>

            <h3 className="text-2xl font-extrabold font-display text-white">
              {hobbiesData.gaming.heroHighlight}
            </h3>

            <p className="text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
              {hobbiesData.gaming.description}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Comms & Execution</div>
              <p className="text-xs font-mono italic text-cyan-300">
                {hobbiesData.gaming.quote}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            {hobbiesData.gaming.stats.map((s, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-bold font-mono text-cyan-300 truncate">{s.value}</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
