import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Flame } from 'lucide-react';

export const Toast = ({ message, isVisible, iconType = "check" }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl glass-pill shadow-2xl border border-curry-gold/30 text-white"
        >
          {iconType === "curry" ? (
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-curry-gold/20 text-curry-gold">
              <Flame className="w-4 h-4 animate-bounce" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
          <span className="text-sm font-medium tracking-tight font-display">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
