import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, FileText, Flame } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const ContactSection = ({ onToast }) => {
  const [copied, setCopied] = useState(false);
  const email = "mittal.nakshatra17@gmail.com";

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    if (onToast) onToast("Email copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="rounded-3xl p-8 sm:p-14 glass-panel border border-white/15 relative overflow-hidden text-center shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-curry-gold/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-curry-gold/15 text-curry-gold text-xs font-mono border border-curry-gold/30">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Open for AI & Engineering Opportunities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white uppercase">
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-curry-gold to-yellow-200">
              Genuinely Useful.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
            Interested in collaborating on Generative AI products, RAG retrieval architectures, or full-stack web platforms? Reach out directly.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleCopyEmail}
              className="group px-6 py-3.5 rounded-full bg-white text-black hover:bg-curry-gold font-display font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2 shadow-xl"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              onClick={() => sounds.playClick()}
              className="px-6 py-3.5 rounded-full glass-pill border border-white/20 hover:border-white text-white font-mono text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Message</span>
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <a
              href="https://linkedin.com/in/nakshatra-mittal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4 text-curry-gold" />
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-600" />
            </a>

            <a
              href="#work"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-curry-gold transition-colors"
            >
              <FileText className="w-4 h-4 text-curry-gold" />
              <span>Explore Case Studies</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Nakshatra Mittal</span>
          <span className="text-zinc-700">/</span>
          <span className="text-curry-gold flex items-center gap-1">
            <Flame className="w-3 h-3" /> #30 Splash Era
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-500">
          <span>AI/ML Engineer · Full-Stack Developer · New Delhi, IN</span>
        </div>
      </footer>
    </section>
  );
};
