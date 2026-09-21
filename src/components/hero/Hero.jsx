import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Flame, MapPin } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Hero = ({ onShootClick, onCopyEmail }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-12 overflow-hidden court-bg">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-curry-gold/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-curry-blue/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">
        
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-white/10 text-xs font-mono text-zinc-300 mb-8 hover:border-curry-gold/40 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-400">Junior AI/ML Engineer @</span>
          <span className="text-white font-medium">Knowledge Synonyms (Noida)</span>
          <span className="text-zinc-600">|</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <MapPin className="w-3 h-3 text-curry-gold" /> Based in New Delhi, IN
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white uppercase font-display leading-none">
            Nakshatra
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 uppercase font-display leading-none">
            Mittal
          </h1>
        </motion.div>

        {/* Subtitle Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono uppercase tracking-widest text-curry-gold"
        >
          <span className="px-3 py-1 rounded-md bg-curry-gold/10 border border-curry-gold/20">AI/ML Engineer</span>
          <span className="text-zinc-600 font-bold">×</span>
          <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">Full-Stack Developer</span>
          <span className="text-zinc-600 font-bold">×</span>
          <span className="px-3 py-1 rounded-md bg-curry-blue/20 border border-curry-blue/40 text-blue-300">GenAI & RAG</span>
        </motion.div>

        {/* Manifesto Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-7 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed font-sans"
        >
          I build software that makes AI <span className="text-white font-medium underline decoration-curry-gold/60 decoration-2 underline-offset-4">genuinely useful</span> — from autonomous document-to-course RAG pipelines to high-speed full-stack products.
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#work"
            onClick={() => sounds.playClick()}
            className="group px-6 py-3.5 rounded-full bg-white text-black font-display font-semibold text-sm tracking-wide hover:bg-curry-gold transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-curry-gold/20"
          >
            <span>Explore Work & Case Studies</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <button
            onClick={() => {
              sounds.playBounce();
              if (onShootClick) onShootClick();
              const el = document.getElementById('playground');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-3.5 rounded-full glass-pill border border-curry-gold/30 hover:border-curry-gold bg-curry-gold/10 hover:bg-curry-gold/20 text-curry-gold font-mono text-xs sm:text-sm font-medium transition-all flex items-center gap-2 shadow-lg"
          >
            <span className="text-base">🏀</span>
            <span>Steph Curry Shootout</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
