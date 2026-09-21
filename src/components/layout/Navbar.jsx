import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Navbar = ({ onOpenPlayground, soundActive, setSoundActive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const nextState = sounds.toggleSound();
    setSoundActive(nextState);
    if (nextState) sounds.playClick();
  };

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Locker & Playground", href: "#playground" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 pointer-events-none transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand Logo & Curry #30 Badge */}
        <a 
          href="#" 
          onClick={() => sounds.playClick()}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-white/10 hover:border-curry-gold/40 transition-all duration-300 shadow-lg"
        >
          <span className="font-display font-bold text-sm tracking-wider uppercase text-white group-hover:text-curry-gold transition-colors">
            Nakshatra
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-curry-gold/15 text-curry-gold border border-curry-gold/30 group-hover:bg-curry-gold group-hover:text-black transition-all">
            <Flame className="w-3 h-3 animate-pulse" />
            <span>#30</span>
          </span>
        </a>

        {/* Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-pill border border-white/10 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sounds.playClick()}
              className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-mono text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Sound toggle + 3PT Game trigger + Resume) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            onClick={toggleAudio}
            title={soundActive ? "Mute interactive audio" : "Enable court sound effects"}
            className="p-2.5 rounded-full glass-pill border border-white/10 text-zinc-300 hover:text-curry-gold hover:border-curry-gold/40 transition-all shadow-md"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-curry-gold" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Quick Shoot 3PT Button */}
          <button
            onClick={() => {
              sounds.playClick();
              if (onOpenPlayground) onOpenPlayground();
              const el = document.getElementById('playground');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-pill border border-curry-gold/30 bg-curry-gold/10 hover:bg-curry-gold/20 text-curry-gold font-mono text-xs transition-all shadow-md"
          >
            <span>🏀 Shoot 3PT</span>
          </button>

          {/* Contact / Resume CTA */}
          <a
            href="#contact"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-white text-black hover:bg-curry-gold font-display font-medium text-xs tracking-wide transition-all duration-300 shadow-md"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-full glass-pill border border-white/10 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pointer-events-auto mt-3 max-w-sm mx-auto p-4 rounded-2xl glass-panel border border-white/15 shadow-2xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-sm font-mono uppercase text-zinc-300 hover:text-curry-gold hover:bg-white/5 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
