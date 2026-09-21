import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Code2 } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-widest mb-2">
            <span>05 // Positioning & Philosophy</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white uppercase">
            About Nakshatra
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans">
          Building software where design, engineering, and artificial intelligence converge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Editorial Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 rounded-3xl p-8 sm:p-10 glass-panel border border-white/10 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-snug">
              “I like building software where <span className="text-curry-gold underline decoration-curry-gold/40 underline-offset-4">design, engineering, and AI meet</span>.”
            </h3>

            <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              I am an AI/ML Engineer and Full-Stack Developer specializing in Generative AI, RAG pipelines, and modern web applications. Currently, I engineer AI-driven e-learning platforms at <strong className="text-white">Knowledge Synonyms</strong>, transforming unstructured corporate knowledge into modular, interactive courses.
            </p>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              My engineering approach is grounded in product thinking: generative models are only as good as the systems that ground them, the user interfaces that expose them, and the latency that respects the user's attention.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Specialization</div>
              <div className="text-sm font-bold font-display text-white mt-0.5">GenAI · RAG Systems</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Degree</div>
              <div className="text-sm font-bold font-display text-white mt-0.5">B.Tech CSE (Data Science)</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Mindset</div>
              <div className="text-sm font-bold font-display text-curry-gold mt-0.5">Clutch Execution</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Identity Snippets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 flex flex-col justify-between space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-wider mb-4">
              <Code2 className="w-4 h-4" />
              <span>Core Principles</span>
            </div>

            <ul className="space-y-4 font-mono text-xs text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-curry-gold font-bold">01.</span>
                <span>Ground AI in verified facts; zero tolerance for hallucinated output.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-curry-gold font-bold">02.</span>
                <span>Sub-second response times beat fancy unoptimized architectures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-curry-gold font-bold">03.</span>
                <span>Design is not skin-deep; UI clarity enables power users to thrive.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-curry-gold font-bold">04.</span>
                <span>High repetition in practice creates effortless clutch execution.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Favorite Shooter</span>
            <span className="text-xs font-mono text-curry-gold font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> Steph Curry #30
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
